import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { resolvers } from './resolvers.js';
import { createContext } from './context.js';

// GraphQLスキーマを直接文字列として定義
const typeDefs = `
type User {
  id: ID!
  name: String!
  email: String!
  team: Team
}

type Team {
  id: ID!
  name: String!
  description: String
  members: [User!]!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  teams: [Team!]!
  team(id: ID!): Team
}

type Mutation {
  createUser(name: String!, email: String!, teamId: ID): User!
  updateUser(id: ID!, name: String, email: String, teamId: ID): User
  deleteUser(id: ID!): User
  
  createTeam(name: String!, description: String): Team!
  updateTeam(id: ID!, name: String, description: String): Team
  deleteTeam(id: ID!): Team
  
  addUserToTeam(userId: ID!, teamId: ID!): User!
  removeUserFromTeam(userId: ID!, teamId: ID!): User!
}
`;

// Create the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create the Lambda handler
export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: createContext,
  }
);
