import { z } from 'zod';
import { MAX_PAGINATION_FIRST, createPaginationCursor, toConnection } from '../../../utils';
import type { TeamMapper } from '../../schema.mappers';
import type { QueryResolvers } from './../../../types.generated';

const TeamCursorSchema = z.object({
  name: z.string(),
  id: z.string(),
});
const { decodeCursor, createCursorEncoder } = createPaginationCursor(TeamCursorSchema);
export const decodeTeamsCursor = decodeCursor;
export const encodeTeamsCursor = createCursorEncoder<TeamMapper>((team) => ({
  id: team.id,
  name: team.name,
}));

export const teams: NonNullable<QueryResolvers['teams']> = async (_parent, args, ctx) => {
  const first = Math.min(args.first, MAX_PAGINATION_FIRST);
  const decodedCursor = args.after ? decodeTeamsCursor(args.after) : undefined;

  const teams = await ctx.prisma.$queryRawUnsafe<
    Array<{
      id: string;
      name: string;
      description: string | null;
      created_at: Date;
      updated_at: Date;
    }>
  >(`
    SELECT * FROM teams
    ${decodedCursor ? `WHERE (name, id) > ('${decodedCursor.name}', '${decodedCursor.id}')` : ''}
    ORDER BY name ASC, id ASC
    LIMIT ${first + 1}
  `);

  return toConnection(teams, encodeTeamsCursor, {
    first: args.first,
    after: args.after ?? undefined,
  });
};
