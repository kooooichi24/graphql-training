import { decodeUsersCursor, encodeUsersCursor } from '../../user/resolvers/Query/users';
import { MAX_PAGINATION_ITEMS, toConnection } from '../../utils';
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
    const first = Math.min(args.first, MAX_PAGINATION_ITEMS);
    const decodedCursor = args.after ? decodeUsersCursor(args.after) : undefined;

    const users = await ctx.loaders.teamMembersLoader.load({
      teamId: parent.id,
      first,
      after: decodedCursor ? { userName: decodedCursor.name, userId: decodedCursor.id } : undefined,
    });

    return toConnection(users, encodeUsersCursor, {
      first,
      after: args.after ?? undefined,
    });
  },
};
