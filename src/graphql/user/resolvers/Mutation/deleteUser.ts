import type { MutationResolvers } from './../../../types.generated';

export const deleteUser: NonNullable<MutationResolvers['deleteUser']> = async (
  _parent,
  arg,
  ctx,
) => {
  return await ctx.prisma.user.delete({
    where: { id: arg.id },
  });
};
