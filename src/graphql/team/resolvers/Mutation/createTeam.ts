import type { MutationResolvers } from './../../../types.generated';

export const createTeam: NonNullable<MutationResolvers['createTeam']> = async (
  _parent,
  arg,
  ctx,
) => {
  const team = await ctx.prisma.team.create({
    data: {
      name: arg.input.name,
      description: arg.input.description,
    },
  });

  return {
    id: team.id,
  };
};
