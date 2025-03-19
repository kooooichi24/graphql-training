import type { Prisma } from '@prisma/client';
import type { Resolvers } from '../../graphql-types.js';

export const teamResolvers: Resolvers = {
  Query: {
    // チーム一覧を取得
    teams: async (_, __, { prisma }) => {
      const teams = await prisma.team.findMany();
      return teams.map((team) => ({
        ...team,
        members: [],
      }));
    },

    // 特定のチームを取得
    team: async (_, { id }, { prisma }) => {
      const team = await prisma.team.findUnique({
        where: { id },
      });

      if (!team) return null;

      return {
        ...team,
        members: [],
      };
    },
  },

  Mutation: {
    // チームを作成
    createTeam: async (_, { name, description }, { prisma }) => {
      const team = await prisma.team.create({
        data: {
          name,
          description,
        },
      });

      return {
        ...team,
        members: [],
      };
    },

    // チームを更新
    updateTeam: async (_, { id, name, description }, { prisma }) => {
      const data: Prisma.TeamUpdateInput = {};

      if (name) {
        data.name = name;
      }

      if (description) {
        data.description = description;
      }

      const team = await prisma.team.update({
        where: { id },
        data,
      });

      return {
        ...team,
        members: [],
      };
    },

    // チームを削除
    deleteTeam: async (_, { id }, { prisma }) => {
      const team = await prisma.team.delete({
        where: { id },
      });

      return {
        ...team,
        members: [],
      };
    },
  },

  // Team型のフィールドリゾルバー
  Team: {
    members: async ({ id: teamId }, _, { loaders }) => {
      const members = await loaders.teamMembersLoader.load(teamId);
      return members.map((member) => ({
        ...member,
        teams: [],
      }));
    },
  },
};
