import { fromGlobalId } from '../../../../utils/globalId';
import type { QueryResolvers } from './../../../types.generated';

export const node: NonNullable<QueryResolvers['node']> = async (_parent, arg, ctx) => {
  const { type, id } = fromGlobalId(arg.id);

  switch (type) {
    case 'User': {
      const user = await ctx.prisma.user.findUnique({
        where: { id },
      });
      return user ? { ...user, __typename: 'User' } : null;
    }
    case 'Team': {
      const team = await ctx.prisma.team.findUnique({
        where: { id },
      });
      return team ? { ...team, __typename: 'Team' } : null;
    }
  }
};
