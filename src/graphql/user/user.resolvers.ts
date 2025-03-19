import type { Prisma } from '@prisma/client';
import type { Resolvers } from '../../graphql-types.js';

export const userResolvers: Resolvers = {
  Query: {
    // ユーザー一覧を取得
    users: async (_, __, { prisma }) => {
      const users = await prisma.user.findMany();
      return users.map((user) => ({
        ...user,
        teams: [],
      }));
    },

    // 特定のユーザーを取得
    user: async (_, { id }, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) return null;

      return {
        ...user,
        teams: [],
      };
    },
  },

  Mutation: {
    // ユーザーを作成
    createUser: async (_, { name, email, teamId }, { prisma }) => {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          ...(teamId
            ? {
                teams: {
                  create: {
                    team: {
                      connect: {
                        id: teamId,
                      },
                    },
                  },
                },
              }
            : {}),
        },
      });
      return { ...user, teams: [] };
    },

    // ユーザーを更新
    updateUser: async (_, { id, name, email }, { prisma }) => {
      const data: Prisma.UserUpdateInput = {};

      if (name !== undefined && name !== null) {
        data.name = name;
      }

      if (email !== undefined && email !== null) {
        data.email = email;
      }

      const user = await prisma.user.update({
        where: { id },
        data,
      });
      return { ...user, teams: [] };
    },

    // ユーザーを削除
    deleteUser: async (_, { id }, { prisma }) => {
      const user = await prisma.user.delete({
        where: { id },
      });
      return { ...user, teams: [] };
    },

    // ユーザーをチームに追加
    addUserToTeam: async (_, { userId, teamId }, { prisma }) => {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          teams: {
            create: {
              team: {
                connect: {
                  id: teamId,
                },
              },
            },
          },
        },
      });
      return { ...user, teams: [] };
    },

    // ユーザーをチームから削除
    removeUserFromTeam: async (_, { userId, teamId }, { prisma }) => {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          teams: {
            deleteMany: {
              teamId: teamId,
            },
          },
        },
      });
      return { ...user, teams: [] };
    },
  },

  // User型のフィールドリゾルバー
  User: {
    // チーム情報を取得
    teams: async ({ id: userId }, _, { prisma: __, loaders }) => {
      /**
       * Without dataloader
       */
      // const teams: Team[] = await prisma.$queryRaw`
      //   SELECT t.*
      //   FROM teams t
      //   JOIN team_members tm ON t.id = tm.team_id
      //   WHERE tm.user_id = ${userId}::uuid
      // `;
      // if (teams.length === 0) return null;

      // const team = teams[0];
      // // const members: User[] = await prisma.$queryRaw`
      // //   SELECT u.* FROM users u
      // //   JOIN team_members tm ON u.id = tm.user_id
      // //   WHERE tm.team_id = ${team.id}::uuid
      // // `;
      // return {
      //   ...team,
      //   members: [],
      // };

      /**
       * With dataloader
       */
      const teams = await loaders.userTeamsLoader.load(userId);
      if (!teams || teams.length === 0) return [];

      return teams.map((team) => ({
        ...team,
        members: [],
      }));
    },
  },
};
