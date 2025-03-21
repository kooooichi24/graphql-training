import type { MutationResolvers } from './../../../types.generated';

export const createUser: NonNullable<MutationResolvers['createUser']> = async (
  _parent,
  arg,
  ctx,
) => {
  return await ctx.prisma.user.create({
    data: {
      name: arg.name,
      email: arg.email,
      ...(arg.teamId
        ? {
            teams: {
              create: {
                team: {
                  connect: {
                    id: arg.teamId,
                  },
                },
              },
            },
          }
        : {}),
    },
  });
};
