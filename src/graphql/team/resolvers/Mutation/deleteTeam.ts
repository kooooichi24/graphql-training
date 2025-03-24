import type { MutationResolvers } from './../../../types.generated';

export const deleteTeam: NonNullable<MutationResolvers['deleteTeam']> = async (
  _parent,
  arg,
  ctx,
) => {
  const team = await ctx.prisma.team.delete({
    where: { id: arg.input.id },
  });

  return {
    id: team.id,
  };
};
