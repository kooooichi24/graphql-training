import { ApolloServer } from '@apollo/server';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { type Context, createContext } from './context.js';
import { schema } from './graphql/schema.js';

// Create the Apollo Server with explicit type parameter
const server = new ApolloServer<Context>({
  schema,
});

// Create the Lambda handler
export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: createContext,
  },
);
