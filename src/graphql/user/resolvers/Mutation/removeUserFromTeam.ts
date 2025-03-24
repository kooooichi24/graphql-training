import type { MutationResolvers } from './../../../types.generated';

export const removeUserFromTeam: NonNullable<MutationResolvers['removeUserFromTeam']> = async (
  _parent,
  arg,
  ctx,
) => {
  const user = await ctx.prisma.user.update({
    where: { id: arg.input.userId },
    data: {
      teams: { deleteMany: { teamId: arg.input.teamId } },
    },
  });

  return {
    id: user.id,
  };
};
