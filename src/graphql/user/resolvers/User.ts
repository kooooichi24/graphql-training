import { decodeTeamCursor, encodeTeamCursor } from '../../team/resolvers/Query/teams';
import { MAX_PAGINATION_FIRST, toConnection } from '../../utils';
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
    const first = Math.min(args.first, MAX_PAGINATION_FIRST);
    const decodedCursor = args.after ? decodeTeamCursor(args.after) : undefined;

    const teams = await ctx.loaders.userTeamsLoader.load({
      userId: parent.id,
      first,
      after: decodedCursor ? { teamName: decodedCursor.name, teamId: decodedCursor.id } : undefined,
    });

    return toConnection(teams, encodeTeamCursor, {
      first,
      after: args.after ?? undefined,
    });
  },
};
