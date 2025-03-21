import type { MutationResolvers } from './../../../types.generated';

export const removeUserFromTeam: NonNullable<MutationResolvers['removeUserFromTeam']> = async (
  _parent,
  arg,
  ctx,
) => {
  return await ctx.prisma.user.update({
    where: { id: arg.userId },
    data: {
      teams: { deleteMany: { teamId: arg.teamId } },
    },
  });
};
