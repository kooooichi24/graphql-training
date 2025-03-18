import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './user/user.resolvers';
import { teamResolvers } from './team/team.resolvers';
import { scalarResolvers } from './scalars/scalars.resolvers';

// TODO: Rethink better merge solution without manually adding resolvers
const resolvers = mergeResolvers([userResolvers, teamResolvers, scalarResolvers]);

export { resolvers };
