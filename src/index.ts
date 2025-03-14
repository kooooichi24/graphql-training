import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createContext } from './context.js';
import { schema } from './graphql/schema.js';

// Create the Apollo Server
const server = new ApolloServer({
  schema,
});

// Start the server
const { url } = await startStandaloneServer(server, {
  context: createContext,
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
