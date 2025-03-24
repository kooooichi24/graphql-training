import type { MutationResolvers } from './../../../types.generated';

export const deleteUser: NonNullable<MutationResolvers['deleteUser']> = async (
  _parent,
  arg,
  ctx,
) => {
  const user = await ctx.prisma.user.delete({
    where: { id: arg.input.id },
  });

  return {
    id: user.id,
  };
};
