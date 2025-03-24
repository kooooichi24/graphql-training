import { PrismaClient, type Team, type User } from '@prisma/client';
import DataLoader from 'dataloader';

// Prismaクライアントのシングルトンインスタンスを作成
// これにより、複数のリクエストで同じインスタンスを再利用できます
let prisma: PrismaClient;

function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  return prisma;
}

// コンテキストの型定義
export type Context = {
  prisma: PrismaClient;
  loaders: {
    userTeamsLoader: DataLoader<
      {
        userId: string;
        first?: number;
        after?: { teamName: string; teamId: string };
        last?: number;
        before?: { teamName: string; teamId: string };
      },
      Team[]
    >;
    teamMembersLoader: DataLoader<
      {
        teamId: string;
        first: number;
        after?: { userName: string; userId: string };
      },
      User[]
    >;
  };
};

// Apollo Serverのコンテキスト作成関数
export async function createContext(): Promise<Context> {
  const prisma = getPrismaClient();

  const userTeamsLoader = new DataLoader(
    async (
      inputs: readonly {
        userId: string;
        first?: number;
        after?: { teamName: string; teamId: string };
        last?: number;
        before?: { teamName: string; teamId: string };
      }[],
    ): Promise<Team[][]> => {
      console.log('--------------------------------');
      console.log('Invoked userTeamsLoader with', inputs);
      console.log('--------------------------------');

      const isBackward = inputs[0].last !== undefined;
      const partitionOrderBy = isBackward ? 't.name DESC, t.id DESC' : 't.name ASC, t.id ASC';

      const teams = await prisma.$queryRawUnsafe<
        Array<{
          id: string;
          name: string;
          description: string | null;
          created_at: Date;
          updated_at: Date;
          user_id: string;
        }>
      >(
        `
        WITH params AS (
          SELECT 
            user_id,
            after_team_name,
            after_team_id,
            before_team_name,
            before_team_id,
            limit_per_user,
            (limit_per_user + 1) AS fetch_limit,
            is_backward
          FROM (VALUES 
            ${inputs
              .map(
                (input) => `(
                  '${input.userId}'::uuid, 
                  ${input.after?.teamName ? `'${input.after.teamName}'` : null},
                  ${input.after?.teamId ? `'${input.after.teamId}'::uuid` : null}, 
                  ${input.before?.teamName ? `'${input.before.teamName}'` : null},
                  ${input.before?.teamId ? `'${input.before.teamId}'::uuid` : null}, 
                  ${input.first || input.last || 0},
                  ${Boolean(input.last)}
                )`,
              )
              .join(',\n')}
          ) AS p(user_id, after_team_name, after_team_id, before_team_name, before_team_id, limit_per_user, is_backward)
        ),
        ranked AS (
          SELECT
            tm.user_id,
            t.id AS team_id,
            t.name,
            t.description,
            t.created_at AS team_created_at,
            t.updated_at AS team_updated_at,
            ROW_NUMBER() OVER (
              PARTITION BY tm.user_id
              ORDER BY ${partitionOrderBy}
            ) AS rn
          FROM
            team_members tm
            INNER JOIN teams t ON tm.team_id = t.id
            INNER JOIN params ON tm.user_id = params.user_id
          WHERE
            (
              (params.is_backward = false AND params.after_team_name IS NULL) OR
              (params.is_backward = false AND (t.name, t.id) > (params.after_team_name, params.after_team_id::uuid))
            )
            OR
            (
              (params.is_backward = true AND params.before_team_name IS NULL) OR
              (params.is_backward = true AND (t.name, t.id) < (params.before_team_name, params.before_team_id::uuid))
            )
        )
        SELECT
          ranked.team_id AS id,
          ranked.name,
          ranked.description,
          ranked.team_created_at AS created_at,
          ranked.team_updated_at AS updated_at,
          ranked.user_id
        FROM ranked
        JOIN params ON ranked.user_id = params.user_id
        WHERE ranked.rn <= params.fetch_limit
        ORDER BY ranked.name ASC, ranked.team_id ASC
        `,
      );

      // 各ユーザーIDに対応するチームの配列を返す
      const teamsByUserId = new Map<string, Team[]>();

      // まず各ユーザーIDに空の配列を初期化
      const userIds = inputs.map((input) => input.userId);
      for (const userId of userIds) {
        teamsByUserId.set(userId, []);
      }

      // 各関連に基づいてチームをユーザーIDにマッピング
      for (const team of teams) {
        const userTeams = teamsByUserId.get(team.user_id) || [];
        userTeams.push({
          id: team.id,
          name: team.name,
          description: team.description,
          createdAt: team.created_at,
          updatedAt: team.updated_at,
        });
        teamsByUserId.set(team.user_id, userTeams);
      }

      // 各ユーザーIDに対応するチームの配列を返す
      return userIds.map((userId) => teamsByUserId.get(userId) || []);
    },
  );

  const teamMembersLoader = new DataLoader(
    async (
      inputs: readonly {
        teamId: string;
        first: number;
        after?: { userName: string; userId: string };
      }[],
    ): Promise<User[][]> => {
      console.log('--------------------------------');
      console.log('Invoked teamMembersLoader with', inputs);
      console.log('--------------------------------');

      const users = await prisma.$queryRawUnsafe<
        Array<{
          id: string;
          name: string;
          email: string;
          created_at: Date;
          updated_at: Date;
          team_id: string;
        }>
      >(
        `
        WITH params AS (
          SELECT 
            team_id,
            after_user_name,
            after_user_id,
            limit_per_team,
            (limit_per_team + 1) AS fetch_limit
          FROM (VALUES 
            ${inputs
              .map(
                (input) => `(
                  '${input.teamId}'::uuid, 
                  ${input.after?.userName ? `'${input.after.userName}'` : null},
                  ${input.after?.userId ? `'${input.after.userId}'::uuid` : null}, 
                  ${input.first}
                )`,
              )
              .join(',\n')}
          ) AS p(team_id, after_user_name, after_user_id, limit_per_team)
        ),
        ranked AS (
          SELECT
            tm.team_id,
            u.id AS user_id,
            u.name,
            u.email,
            u.created_at AS user_created_at,
            u.updated_at AS user_updated_at,
            ROW_NUMBER() OVER (
              PARTITION BY tm.user_id
              ORDER BY u.name ASC, u.id ASC
            ) AS rn
          FROM
            team_members tm
            INNER JOIN users u ON tm.user_id = u.id
            INNER JOIN params ON tm.team_id = params.team_id
          WHERE
            params.after_user_name IS NULL
            OR (u.name, u.id) > (params.after_user_name, params.after_user_id::uuid)
        )
        SELECT
          ranked.user_id AS id,
          ranked.name,
          ranked.email,
          ranked.user_created_at AS created_at,
          ranked.user_updated_at AS updated_at,
          ranked.team_id
        FROM ranked
        JOIN params ON ranked.team_id = params.team_id
        WHERE ranked.rn <= params.fetch_limit
        `,
      );

      // 各チームIDに対応するユーザーの配列を返す
      const usersByTeamId = new Map<string, User[]>();

      // まず各チームIDに空の配列を初期化
      const teamIds = inputs.map((input) => input.teamId);
      for (const teamId of teamIds) {
        usersByTeamId.set(teamId, []);
      }

      for (const user of users) {
        const teamUsers = usersByTeamId.get(user.team_id) || [];
        teamUsers.push({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        });
        usersByTeamId.set(user.team_id, teamUsers);
      }

      // 各チームIDに対応するユーザーの配列を返す
      return teamIds.map((teamId) => usersByTeamId.get(teamId) || []);
    },
  );

  return {
    prisma,
    loaders: {
      userTeamsLoader,
      teamMembersLoader,
    },
  };
}
