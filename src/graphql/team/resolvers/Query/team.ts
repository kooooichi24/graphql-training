import type { QueryResolvers } from './../../../types.generated';

export const team: NonNullable<QueryResolvers['team']> = async (_parent, arg, ctx) => {
  return await ctx.prisma.team.findUnique({
    where: {
      id: arg.id,
    },
  });
};
