import type { MutationResolvers } from './../../../types.generated';

export const addUserToTeam: NonNullable<MutationResolvers['addUserToTeam']> = async (
  _parent,
  arg,
  ctx,
) => {
  const user = await ctx.prisma.user.update({
    where: { id: arg.input.userId },
    data: {
      teams: {
        create: {
          team: {
            connect: {
              id: arg.input.teamId,
            },
          },
        },
      },
    },
  });

  return {
    id: user.id,
  };
};
