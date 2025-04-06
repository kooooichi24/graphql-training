import { shield, allow } from 'graphql-shield';
import { isAdmin } from './rules';

export const permissions = shield(
  {
    Query: {
      '*': allow,
    },
    Mutation: {
      '*': allow,
      createTeam: isAdmin,
      createUser: isAdmin,
      deleteTeam: isAdmin,
      deleteUser: isAdmin,
      updateTeam: isAdmin,
      updateUser: isAdmin,
    },
  },
  {
    allowExternalErrors: true,
  },
);
