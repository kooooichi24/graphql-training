import type { QueryResolvers } from './../../../types.generated';

export const user: NonNullable<QueryResolvers['user']> = async (_parent, _arg, ctx) => {
  const user = await ctx.prisma.user.findUnique({
    where: { id: _arg.id },
  });

  return user;
};
