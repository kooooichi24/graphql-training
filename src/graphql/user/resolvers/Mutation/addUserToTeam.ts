import type { MutationResolvers } from './../../../types.generated';

export const addUserToTeam: NonNullable<MutationResolvers['addUserToTeam']> = async (
  _parent,
  arg,
  ctx,
) => {
  return await ctx.prisma.user.update({
    where: { id: arg.userId },
    data: {
      teams: {
        create: {
          team: {
            connect: {
              id: arg.teamId,
            },
          },
        },
      },
    },
  });
};
