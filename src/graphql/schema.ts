import { join } from 'node:path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';

// TODO: Rethink better path definition to load schema files
const typeDefs = loadSchemaSync(join(process.cwd(), 'src/graphql/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

// Merge schema and resolver to create an executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { schema };
