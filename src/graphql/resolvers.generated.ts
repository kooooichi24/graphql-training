import {
  EmailAddressResolver,
  NonEmptyStringResolver,
  NonNegativeIntResolver,
} from 'graphql-scalars';
import { node as Query_node } from './node/resolvers/Query/node';
import { PageInfo } from './pageInfo/resolvers/PageInfo';
import { createTeam as Mutation_createTeam } from './team/resolvers/Mutation/createTeam';
import { deleteTeam as Mutation_deleteTeam } from './team/resolvers/Mutation/deleteTeam';
import { updateTeam as Mutation_updateTeam } from './team/resolvers/Mutation/updateTeam';
import { team as Query_team } from './team/resolvers/Query/team';
import { teams as Query_teams } from './team/resolvers/Query/teams';
import { Team } from './team/resolvers/Team';
import { TeamConnection } from './team/resolvers/TeamConnection';
import { TeamEdge } from './team/resolvers/TeamEdge';
import { TeamMemberConnection } from './teamMember/resolvers/TeamMemberConnection';
import { TeamMemberEdge } from './teamMember/resolvers/TeamMemberEdge';
/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from './types.generated';
import { addUserToTeam as Mutation_addUserToTeam } from './user/resolvers/Mutation/addUserToTeam';
import { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import { deleteUser as Mutation_deleteUser } from './user/resolvers/Mutation/deleteUser';
import { removeUserFromTeam as Mutation_removeUserFromTeam } from './user/resolvers/Mutation/removeUserFromTeam';
import { updateUser as Mutation_updateUser } from './user/resolvers/Mutation/updateUser';
import { user as Query_user } from './user/resolvers/Query/user';
import { users as Query_users } from './user/resolvers/Query/users';
import { User } from './user/resolvers/User';
import { UserConnection } from './user/resolvers/UserConnection';
import { UserEdge } from './user/resolvers/UserEdge';
import { UserOutput } from './user/resolvers/UserOutput';
export const resolvers: Resolvers = {
  Query: {
    node: Query_node,
    team: Query_team,
    teams: Query_teams,
    user: Query_user,
    users: Query_users,
  },
  Mutation: {
    addUserToTeam: Mutation_addUserToTeam,
    createTeam: Mutation_createTeam,
    createUser: Mutation_createUser,
    deleteTeam: Mutation_deleteTeam,
    deleteUser: Mutation_deleteUser,
    removeUserFromTeam: Mutation_removeUserFromTeam,
    updateTeam: Mutation_updateTeam,
    updateUser: Mutation_updateUser,
  },

  PageInfo: PageInfo,
  Team: Team,
  TeamConnection: TeamConnection,
  TeamEdge: TeamEdge,
  TeamMemberConnection: TeamMemberConnection,
  TeamMemberEdge: TeamMemberEdge,
  User: User,
  UserConnection: UserConnection,
  UserEdge: UserEdge,
  UserOutput: UserOutput,
  EmailAddress: EmailAddressResolver,
  NonEmptyString: NonEmptyStringResolver,
  NonNegativeInt: NonNegativeIntResolver,
};
