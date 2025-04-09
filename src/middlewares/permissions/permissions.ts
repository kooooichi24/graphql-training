import { allow, shield } from 'graphql-shield';
import { isAdmin } from './rules';

// TODO: Apply type-safety approach about ruleTree argument.
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
