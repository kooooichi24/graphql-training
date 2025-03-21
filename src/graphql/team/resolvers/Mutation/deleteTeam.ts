import type { MutationResolvers } from './../../../types.generated';

export const deleteTeam: NonNullable<MutationResolvers['deleteTeam']> = async (
  _parent,
  arg,
  ctx,
) => {
  return await ctx.prisma.team.delete({
    where: { id: arg.id },
  });
};
