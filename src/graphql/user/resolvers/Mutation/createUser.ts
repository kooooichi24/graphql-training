import type { MutationResolvers } from './../../../types.generated';

export const createUser: NonNullable<MutationResolvers['createUser']> = async (
  _parent,
  arg,
  ctx,
) => {
  const user = await ctx.prisma.user.create({
    data: {
      name: arg.input.name,
      email: arg.input.email,
      role: arg.input.role,
      ...(arg.input.teamId
        ? {
            teams: {
              create: {
                team: {
                  connect: {
                    id: arg.input.teamId,
                  },
                },
              },
            },
          }
        : {}),
    },
  });

  return {
    id: user.id,
  };
};
