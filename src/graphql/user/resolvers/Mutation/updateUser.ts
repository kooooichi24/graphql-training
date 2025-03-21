import type { Prisma } from '@prisma/client';
import type { MutationResolvers } from './../../../types.generated';

export const updateUser: NonNullable<MutationResolvers['updateUser']> = async (
  _parent,
  arg,
  ctx,
) => {
  const data: Prisma.UserUpdateInput = {};

  if (arg.name !== undefined && arg.name !== null) {
    data.name = arg.name;
  }

  if (arg.email !== undefined && arg.email !== null) {
    data.email = arg.email;
  }

  return await ctx.prisma.user.update({
    where: { id: arg.id },
    data,
  });
};
