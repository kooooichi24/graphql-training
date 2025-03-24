import type { Prisma } from '@prisma/client';
import type { MutationResolvers } from './../../../types.generated';

export const updateTeam: NonNullable<MutationResolvers['updateTeam']> = async (
  _parent,
  arg,
  ctx,
) => {
  const data: Prisma.TeamUpdateInput = {};

  if (arg.input.name) {
    data.name = arg.input.name;
  }

  if (arg.input.description) {
    data.description = arg.input.description;
  }

  const team = await ctx.prisma.team.update({
    where: { id: arg.input.id },
    data,
  });

  return {
    id: team.id,
  };
};
