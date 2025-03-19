import type { Context } from '../../context.js';
import type { Prisma } from '@prisma/client';
import type { Maybe, Team, User } from '../../graphql-types.js';

export const userResolvers = {
  Query: {
    // ユーザー一覧を取得
    users: (_parent: unknown, _args: unknown, context: Context): Promise<User[]> => {
      return context.prisma.user.findMany();
    },

    // 特定のユーザーを取得
    user: (_parent: unknown, args: { id: string }, context: Context): Promise<Maybe<User>> => {
      return context.prisma.user.findUnique({
        where: { id: args.id },
      });
    },
  },

  Mutation: {
    // ユーザーを作成
    createUser: (
      _parent: unknown,
      args: { name: string; email: string; teamId?: string },
      context: Context,
    ) => {
      return context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          ...(args.teamId
            ? {
                teams: {
                  create: {
                    team: {
                      connect: {
                        id: args.teamId,
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
    updateUser: (
      _parent: unknown,
      args: { id: string; name?: string; email?: string; teamId?: string },
      context: Context,
    ) => {
      const data: Prisma.UserUpdateInput = {};

      if (args.name !== undefined) {
        data.name = args.name;
      }

      if (args.email !== undefined) {
        data.email = args.email;
      }

      return context.prisma.user.update({
        where: { id: args.id },
        data,
      });
    },

    // ユーザーを削除
    deleteUser: (_parent: unknown, args: { id: string }, context: Context) => {
      return context.prisma.user.delete({
        where: { id: args.id },
      });
    },

    // ユーザーをチームに追加
    addUserToTeam: (
      _parent: unknown,
      args: { userId: string; teamId: string },
      context: Context,
    ) => {
      return context.prisma.user.update({
        where: { id: args.userId },
        data: {
          teams: {
            create: {
              team: {
                connect: {
                  id: args.teamId,
                },
              },
            },
          },
        },
      });
    },

    // ユーザーをチームから削除
    removeUserFromTeam: (
      _parent: unknown,
      args: { userId: string; teamId: string },
      context: Context,
    ) => {
      return context.prisma.user.update({
        where: { id: args.userId },
        data: {
          teams: {
            deleteMany: {
              teamId: args.teamId,
            },
          },
        },
      });
    },
  },

  // User型のフィールドリゾルバー
  User: {
    // チーム情報を取得
    team: async (
      parent: { id: string },
      _args: unknown,
      context: Context,
    ): Promise<Maybe<Team>> => {
      const userTeams = await context.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .teams();

      if (!userTeams || userTeams.length === 0) {
        return null;
      }

      const teamId = userTeams[0].teamId;
      const team = await context.prisma.team.findUnique({
        where: { id: teamId },
      });

      if (!team) {
        return null;
      }

      // チームに所属するユーザー情報を取得
      const teamUsers = await context.prisma.user.findMany({
        where: {
          teams: {
            some: {
              teamId,
            },
          },
        },
      });

      // GraphQLの型に適合するように変換
      return {
        ...team,
        members: teamUsers,
      };
    },
  },
};
