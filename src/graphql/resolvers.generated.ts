/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { team as Query_team } from './team/resolvers/Query/team';
import    { teams as Query_teams } from './team/resolvers/Query/teams';
import    { user as Query_user } from './user/resolvers/Query/user';
import    { users as Query_users } from './user/resolvers/Query/users';
import    { addUserToTeam as Mutation_addUserToTeam } from './user/resolvers/Mutation/addUserToTeam';
import    { createTeam as Mutation_createTeam } from './team/resolvers/Mutation/createTeam';
import    { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import    { deleteTeam as Mutation_deleteTeam } from './team/resolvers/Mutation/deleteTeam';
import    { deleteUser as Mutation_deleteUser } from './user/resolvers/Mutation/deleteUser';
import    { removeUserFromTeam as Mutation_removeUserFromTeam } from './user/resolvers/Mutation/removeUserFromTeam';
import    { updateTeam as Mutation_updateTeam } from './team/resolvers/Mutation/updateTeam';
import    { updateUser as Mutation_updateUser } from './user/resolvers/Mutation/updateUser';
import    { Team } from './team/resolvers/Team';
import    { User } from './user/resolvers/User';
import    { DateTimeResolver,EmailAddressResolver,NonEmptyStringResolver,UUIDResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { team: Query_team,teams: Query_teams,user: Query_user,users: Query_users },
      Mutation: { addUserToTeam: Mutation_addUserToTeam,createTeam: Mutation_createTeam,createUser: Mutation_createUser,deleteTeam: Mutation_deleteTeam,deleteUser: Mutation_deleteUser,removeUserFromTeam: Mutation_removeUserFromTeam,updateTeam: Mutation_updateTeam,updateUser: Mutation_updateUser },
      
      Team: Team,
User: User,
DateTime: DateTimeResolver,
EmailAddress: EmailAddressResolver,
NonEmptyString: NonEmptyStringResolver,
UUID: UUIDResolver
    }