import { decodeTeamsCursor, encodeTeamsCursor } from '../../team/resolvers/Query/teams';
import { DEFAULT_PAGINATION_ITEMS, MAX_PAGINATION_ITEMS, toConnection } from '../../utils';
import type { UserResolvers } from './../../types.generated';

/*
 * Note: This object type is generated because "UserMapper" is declared. This is to ensure runtime safety.
 *
 * When a mapper is used, it is possible to hit runtime errors in some scenarios:
 * - given a field name, the schema type's field type does not match mapper's field type
 * - or a schema type's field does not exist in the mapper's fields
 *
 * If you want to skip this file generation, remove the mapper or update the pattern in the `resolverGeneration.object` config.
 */
export const User: UserResolvers = {
  teams: async (parent, args, ctx) => {
    const first = args.first
      ? Math.min(args.first, MAX_PAGINATION_ITEMS)
      : args.last
        ? undefined
        : DEFAULT_PAGINATION_ITEMS;
    const after = args.after ? decodeTeamsCursor(args.after) : undefined;
    const last = args.last ? Math.min(args.last, MAX_PAGINATION_ITEMS) : undefined;
    const before = args.before ? decodeTeamsCursor(args.before) : undefined;

    const teams = await ctx.loaders.userTeamsLoader.load({
      userId: parent.id,
      first,
      after: after ? { teamName: after.name, teamId: after.id } : undefined,
      last,
      before: before ? { teamName: before.name, teamId: before.id } : undefined,
    });

    return toConnection(teams, encodeTeamsCursor, {
      first,
      after: args.after ?? undefined,
      last,
      before: args.before ?? undefined,
    });
  },
};
