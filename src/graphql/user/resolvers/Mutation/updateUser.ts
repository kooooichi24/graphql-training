import type { Prisma } from '@prisma/client';
import type { MutationResolvers } from './../../../types.generated';

export const updateUser: NonNullable<MutationResolvers['updateUser']> = async (
  _parent,
  arg,
  ctx,
) => {
  const data: Prisma.UserUpdateInput = {};

  if (arg.input.name !== undefined && arg.input.name !== null) {
    data.name = arg.input.name;
  }

  if (arg.input.email !== undefined && arg.input.email !== null) {
    data.email = arg.input.email;
  }

  if (arg.input.role !== undefined && arg.input.role !== null) {
    data.role = arg.input.role;
  }

  const user = await ctx.prisma.user.update({
    where: { id: arg.input.id },
    data,
  });

  return {
    id: user.id,
  };
};
