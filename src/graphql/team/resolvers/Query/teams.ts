import { z } from 'zod';
import {
  DEFAULT_PAGINATION_ITEMS,
  MAX_PAGINATION_ITEMS,
  createPaginationCursor,
  toConnection,
} from '../../../../utils/pagination';
import type { TeamMapper } from '../../schema.mappers';
import type { QueryResolvers } from './../../../types.generated';

const CursorSchema = z.object({
  name: z.string(),
  id: z.string(),
});
const { decodeCursor, createCursorEncoder } = createPaginationCursor(CursorSchema);
export const decodeTeamsCursor = decodeCursor;
export const encodeTeamsCursor = createCursorEncoder<TeamMapper>((team) => ({
  id: team.id,
  name: team.name,
}));

export const teams: NonNullable<QueryResolvers['teams']> = async (_parent, args, ctx) => {
  const first = args.first
    ? Math.min(args.first, MAX_PAGINATION_ITEMS)
    : args.last
      ? undefined
      : DEFAULT_PAGINATION_ITEMS;
  const after = args.after ? decodeTeamsCursor(args.after) : undefined;
  const last = args.last ? Math.min(args.last, MAX_PAGINATION_ITEMS) : undefined;
  const before = args.before ? decodeTeamsCursor(args.before) : undefined;

  const isBackward = args.last !== undefined;
  const orderBy = isBackward ? 'name DESC, id DESC' : 'name ASC, id ASC';

  const teams = await ctx.prisma.$queryRawUnsafe<
    Array<{
      id: string;
      name: string;
      description: string | null;
      created_at: Date;
      updated_at: Date;
    }>
  >(`WITH ordered_teams AS (
      SELECT * 
      FROM teams
      WHERE 1=1
      ${after ? `AND (name, id) > ('${after.name}', '${after.id}')` : ''}
      ${before ? `AND (name, id) < ('${before.name}', '${before.id}')` : ''}
      ORDER BY ${orderBy}
      LIMIT ${(first ?? last ?? DEFAULT_PAGINATION_ITEMS) + 1}
    )
    SELECT * FROM ordered_teams
    ORDER BY name ASC, id ASC
  `);

  return toConnection(teams, encodeTeamsCursor, {
    first,
    after: args.after ?? undefined,
    last,
    before: args.before ?? undefined,
  });
};
