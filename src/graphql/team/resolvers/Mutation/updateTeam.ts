import type { Prisma } from '@prisma/client';
import type { MutationResolvers } from './../../../types.generated';

export const updateTeam: NonNullable<MutationResolvers['updateTeam']> = async (
  _parent,
  arg,
  ctx,
) => {
  const data: Prisma.TeamUpdateInput = {};

  if (arg.name) {
    data.name = arg.name;
  }

  if (arg.description) {
    data.description = arg.description;
  }

  return await ctx.prisma.team.update({
    where: { id: arg.id },
    data,
  });
};
