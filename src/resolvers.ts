import type { Context } from './context.js';

export const resolvers = {
  Query: {
    // User queries
    users: (_parent: unknown, _args: unknown, context: Context) => {
      return context.prisma.user.findMany();
    },
    user: (_parent: unknown, args: { id: string }, context: Context) => {
      return context.prisma.user.findUnique({
        where: { id: args.id },
      });
    },

    // Team queries
    teams: (_parent: unknown, _args: unknown, context: Context) => {
      return context.prisma.team.findMany();
    },
    team: (_parent: unknown, args: { id: string }, context: Context) => {
      return context.prisma.team.findUnique({
        where: { id: args.id },
      });
    },
  },

  Mutation: {
    // User mutations
    createUser: (
      _parent: unknown,
      args: { name: string; email: string; teamId?: string },
      context: Context,
    ) => {
      return context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          ...(args.teamId && {
            teams: {
              create: {
                team: {
                  connect: { id: args.teamId },
                },
              },
            },
          }),
        },
      });
    },
    updateUser: (
      _parent: unknown,
      args: { id: string; name?: string; email?: string; teamId?: string },
      context: Context,
    ) => {
      const data: {
        name?: string;
        email?: string;
        team?: { connect?: { id: string } };
      } = {};
      if (args.name) data.name = args.name;
      if (args.email) data.email = args.email;

      return context.prisma.user.update({
        where: { id: args.id },
        data,
      });
    },
    deleteUser: (_parent: unknown, args: { id: string }, context: Context) => {
      return context.prisma.user.delete({
        where: { id: args.id },
      });
    },

    // Team mutations
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
    updateTeam: (
      _parent: unknown,
      args: { id: string; name?: string; description?: string },
      context: Context,
    ) => {
      const data: { name?: string; description?: string } = {};
      if (args.name) data.name = args.name;
      if (args.description !== undefined) data.description = args.description;

      return context.prisma.team.update({
        where: { id: args.id },
        data,
      });
    },
    deleteTeam: (_parent: unknown, args: { id: string }, context: Context) => {
      return context.prisma.team.delete({
        where: { id: args.id },
      });
    },

    // Team membership mutations
    addUserToTeam: async (
      _parent: unknown,
      args: { userId: string; teamId: string },
      context: Context,
    ) => {
      await context.prisma.teamUser.create({
        data: {
          userId: args.userId,
          teamId: args.teamId,
        },
      });

      return context.prisma.user.findUnique({
        where: { id: args.userId },
      });
    },
    removeUserFromTeam: async (
      _parent: unknown,
      args: { userId: string; teamId: string },
      context: Context,
    ) => {
      await context.prisma.teamUser.delete({
        where: {
          userId_teamId: {
            userId: args.userId,
            teamId: args.teamId,
          },
        },
      });

      return context.prisma.user.findUnique({
        where: { id: args.userId },
      });
    },
  },

  // Field resolvers
  User: {
    team: async (parent: { id: string }, _args: unknown, context: Context) => {
      const teamUser = await context.prisma.teamUser.findFirst({
        where: { userId: parent.id },
        include: { team: true },
      });
      return teamUser?.team || null;
    },
  },

  Team: {
    members: async (parent: { id: string }, _args: unknown, context: Context) => {
      const teamUsers = await context.prisma.teamUser.findMany({
        where: { teamId: parent.id },
        include: { user: true },
      });
      return teamUsers.map((tu) => tu.user);
    },
  },
};
