import { decodeUsersCursor, encodeUsersCursor } from '../../user/resolvers/Query/users';
import { DEFAULT_PAGINATION_ITEMS, MAX_PAGINATION_ITEMS, toConnection } from '../../utils';
import type { TeamResolvers } from './../../types.generated';

/*
 * Note: This object type is generated because "TeamMapper" is declared. This is to ensure runtime safety.
 *
 * When a mapper is used, it is possible to hit runtime errors in some scenarios:
 * - given a field name, the schema type's field type does not match mapper's field type
 * - or a schema type's field does not exist in the mapper's fields
 *
 * If you want to skip this file generation, remove the mapper or update the pattern in the `resolverGeneration.object` config.
 */
export const Team: TeamResolvers = {
  members: async (parent, args, ctx) => {
    const first = args.first
      ? Math.min(args.first, MAX_PAGINATION_ITEMS)
      : args.last
        ? undefined
        : DEFAULT_PAGINATION_ITEMS;
    const after = args.after ? decodeUsersCursor(args.after) : undefined;
    const last = args.last ? Math.min(args.last, MAX_PAGINATION_ITEMS) : undefined;
    const before = args.before ? decodeUsersCursor(args.before) : undefined;

    const users = await ctx.loaders.teamMembersLoader.load({
      teamId: parent.id,
      first,
      after: after ? { userId: after.id, userName: after.name } : undefined,
      last,
      before: before ? { userId: before.id, userName: before.name } : undefined,
    });

    return toConnection(users, encodeUsersCursor, {
      first,
      after: args.after ?? undefined,
      last,
      before: args.before ?? undefined,
    });
  },
};
