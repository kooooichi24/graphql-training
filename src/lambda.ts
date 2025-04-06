import { ApolloServer } from '@apollo/server';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { type Context, createContext } from './context.js';
import { resolvers } from './graphql/resolvers.generated.js';
import { typeDefs } from './graphql/typeDefs.generated.js';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './middlewares/permissions/index.js';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const schemaWithMiddleware = applyMiddleware(schema, permissions);

// Create the Apollo Server with explicit type parameter
const server = new ApolloServer<Context>({
  schema: schemaWithMiddleware,
});

// Create the Lambda handler
export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: createContext,
  },
);
