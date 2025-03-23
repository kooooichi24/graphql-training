import { z } from 'zod';
import { MAX_PAGINATION_FIRST, createPaginationCursor, toConnection } from '../../../utils';
import type { UserMapper } from '../../schema.mappers';
import type { QueryResolvers } from './../../../types.generated';

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
  const first = Math.min(args.first, MAX_PAGINATION_FIRST);
  const decodedCursor = args.after ? decodeUsersCursor(args.after) : undefined;

  const users = await ctx.prisma.$queryRawUnsafe<
    Array<{
      id: string;
      name: string;
      email: string;
      created_at: Date;
      updated_at: Date;
    }>
  >(`
      SELECT * FROM users
      ${decodedCursor ? `WHERE (name, id) > ('${decodedCursor.name}', '${decodedCursor.id}')` : ''}
      ORDER BY name ASC, id ASC
      LIMIT ${first + 1}
    `);

  return toConnection(users, encodeUsersCursor, {
    first: args.first,
    after: args.after ?? undefined,
  });
};
