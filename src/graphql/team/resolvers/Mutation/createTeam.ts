import type { MutationResolvers } from './../../../types.generated';

export const createTeam: NonNullable<MutationResolvers['createTeam']> = async (
  _parent,
  arg,
  ctx,
) => {
  return await ctx.prisma.team.create({
    data: {
      name: arg.name,
      description: arg.description,
    },
  });
};
