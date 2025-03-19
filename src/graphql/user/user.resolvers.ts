import type { Prisma } from '@prisma/client';
import type { Resolvers } from '../../graphql-types.js';

export const userResolvers: Resolvers = {
  Query: {
    // ユーザー一覧を取得
    users: (_, __, { prisma }) => {
      return prisma.user.findMany();
    },

    // 特定のユーザーを取得
    user: (_, { id }, { prisma }) => {
      return prisma.user.findUnique({
        where: { id },
      });
    },
  },

  Mutation: {
    // ユーザーを作成
    createUser: (_, { name, email, teamId }, { prisma }) => {
      return prisma.user.create({
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
    },

    // ユーザーを更新
    updateUser: (_, { id, name, email }, { prisma }) => {
      const data: Prisma.UserUpdateInput = {};

      if (name !== undefined && name !== null) {
        data.name = name;
      }

      if (email !== undefined && email !== null) {
        data.email = email;
      }

      return prisma.user.update({
        where: { id },
        data,
      });
    },

    // ユーザーを削除
    deleteUser: (_, { id }, { prisma }) => {
      return prisma.user.delete({
        where: { id },
      });
    },

    // ユーザーをチームに追加
    addUserToTeam: (_, { userId, teamId }, { prisma }) => {
      return prisma.user.update({
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
    },

    // ユーザーをチームから削除
    removeUserFromTeam: (_, { userId, teamId }, { prisma }) => {
      return prisma.user.update({
        where: { id: userId },
        data: {
          teams: {
            deleteMany: {
              teamId: teamId,
            },
          },
        },
      });
    },
  },

  // User型のフィールドリゾルバー
  User: {
    // チーム情報を取得
    team: async ({ id: userId }, _, { prisma: __, loaders }) => {
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
      if (!teams || teams.length === 0) return null;

      return {
        ...teams[0],
        members: [],
      };
    },
  },
};
