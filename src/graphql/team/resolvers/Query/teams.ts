import type { QueryResolvers } from './../../../types.generated';

export const teams: NonNullable<QueryResolvers['teams']> = async (_parent, _arg, ctx) => {
  return ctx.prisma.team.findMany();
};
