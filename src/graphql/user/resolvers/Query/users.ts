import { z } from 'zod';
import type { UserMapper } from '../../schema.mappers';
import type { QueryResolvers } from './../../../types.generated';
import { createPaginationCursor, DEFAULT_PAGINATION_ITEMS, MAX_PAGINATION_ITEMS, toConnection } from '../../../../utils/pagination';

const CursorSchema = z.object({
  name: z.string(),
  id: z.string(),
});
const { decodeCursor, createCursorEncoder } = createPaginationCursor(CursorSchema);
export const decodeUsersCursor = decodeCursor;
export const encodeUsersCursor = createCursorEncoder<UserMapper>((user) => ({
  id: user.id,
  name: user.name,
}));

export const users: NonNullable<QueryResolvers['users']> = async (_parent, args, ctx) => {
  const first = args.first
    ? Math.min(args.first, MAX_PAGINATION_ITEMS)
    : args.last
      ? undefined
      : DEFAULT_PAGINATION_ITEMS;
  const after = args.after ? decodeUsersCursor(args.after) : undefined;
  const last = args.last ? Math.min(args.last, MAX_PAGINATION_ITEMS) : undefined;
  const before = args.before ? decodeUsersCursor(args.before) : undefined;

  const isBackward = args.last !== undefined;
  const orderBy = isBackward ? 'name DESC, id DESC' : 'name ASC, id ASC';

  const users = await ctx.prisma.$queryRawUnsafe<
    Array<{
      id: string;
      name: string;
      email: string;
      created_at: Date;
      updated_at: Date;
    }>
  >(`
      WITH ordered_users AS (
        SELECT *
        FROM users
        WHERE 1=1
        ${after ? `AND (name, id) > ('${after.name}', '${after.id}')` : ''}
        ${before ? `AND (name, id) < ('${before.name}', '${before.id}')` : ''}
        ORDER BY ${orderBy}
        LIMIT ${(first ?? last ?? DEFAULT_PAGINATION_ITEMS) + 1}
      )
      SELECT * FROM ordered_users
      ORDER BY name ASC, id ASC
    `);

  return toConnection(users, encodeUsersCursor, {
    first,
    after: args.after ?? undefined,
    last,
    before: args.before ?? undefined,
  });
};
