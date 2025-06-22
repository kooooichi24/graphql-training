import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { depthLimit } from '@graphile/depth-limit';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import createComplexityRule, { simpleEstimator } from 'graphql-query-complexity';
import { type Context, createContext } from './context.js';
import { resolvers } from './graphql/resolvers.generated.js';
import { typeDefs } from './graphql/typeDefs.generated.js';
import { permissions } from './middlewares/permissions/index.js';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const schemaWithMiddleware = applyMiddleware(schema, permissions);

async function startApolloServer() {
  const server = new ApolloServer<Context>({
    schema: schemaWithMiddleware,
    validationRules: [
      depthLimit(),
      createComplexityRule({
        estimators: [simpleEstimator({ defaultComplexity: 1 })],
        maximumComplexity: 1000,
        onComplete: (complexity: number) => {
          console.log('##################');
          console.log('Query Complexity:', complexity);
          console.log('##################');
        },
      }),
    ],
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 3000 },
    context: createContext,
  });

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
