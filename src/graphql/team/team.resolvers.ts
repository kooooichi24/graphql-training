import type { Context } from '../../context.js';
import type { Prisma } from '@prisma/client';

export const teamResolvers = {
  Query: {
    // チーム一覧を取得
    teams: (_parent: unknown, _args: unknown, context: Context) => {
      return context.prisma.team.findMany();
    },

    // 特定のチームを取得
    team: (_parent: unknown, args: { id: string }, context: Context) => {
      return context.prisma.team.findUnique({
        where: { id: args.id },
      });
    },
  },

  Mutation: {
    // チームを作成
    createTeam: (
      _parent: unknown,
      args: { name: string; description?: string },
      context: Context,
    ) => {
      return context.prisma.team.create({
        data: {
          name: args.name,
          description: args.description,
        },
      });
    },

    // チームを更新
    updateTeam: (
      _parent: unknown,
      args: { id: string; name?: string; description?: string },
      context: Context,
    ) => {
      const data: Prisma.TeamUpdateInput = {};

      if (args.name !== undefined) {
        data.name = args.name;
      }

      if (args.description !== undefined) {
        data.description = args.description;
      }

      return context.prisma.team.update({
        where: { id: args.id },
        data,
      });
    },

    // チームを削除
    deleteTeam: (_parent: unknown, args: { id: string }, context: Context) => {
      return context.prisma.team.delete({
        where: { id: args.id },
      });
    },
  },

  // Team型のフィールドリゾルバー
  Team: {
    // チームのメンバーを取得
    members: (parent: { id: string }, _args: unknown, context: Context) => {
      return context.prisma.team
        .findUnique({
          where: { id: parent.id },
        })
        .members()
        .then((teamUsers) => {
          if (!teamUsers || teamUsers.length === 0) {
            return [];
          }

          const userIds = teamUsers.map((tu) => tu.userId);
          return context.prisma.user.findMany({
            where: {
              id: {
                in: userIds,
              },
            },
          });
        });
    },
  },
};
