import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
import { TeamMapper } from './team/type.mappers';
import { UserMapper } from './user/type.mappers';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** @see https://the-guild.dev/graphql/scalars/docs/scalars/email-address */
  EmailAddress: { input: string; output: string };
  /** @see https://the-guild.dev/graphql/scalars/docs/scalars/non-empty-string */
  NonEmptyString: { input: string; output: string };
  /** @see https://the-guild.dev/graphql/scalars/docs/scalars/non-negative-int */
  NonNegativeInt: { input: number; output: number };
};

/** This input represents the input to add a user to a team. */
export type AddUserToTeamInput = {
  /** The ID of the team to add the user to. */
  teamId: Scalars['ID']['input'];
  /** The ID of the user to add to the team. */
  userId: Scalars['ID']['input'];
};

/** This interface represents a business error. */
export type BusinessError = {
  /** The message of the business error. */
  message: Scalars['String']['output'];
};

/** This input represents the input to create a team. */
export type CreateTeamInput = {
  /** The description of the team. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the team. */
  name: Scalars['NonEmptyString']['input'];
};

/** This input represents the input to create a user. */
export type CreateUserInput = {
  /** The email address of the user. */
  email: Scalars['EmailAddress']['input'];
  /** The name of the user. */
  name: Scalars['NonEmptyString']['input'];
  /** The role of the user. */
  role: Role;
  /** The ID of the team to which the user belongs. */
  teamId?: InputMaybe<Scalars['ID']['input']>;
};

/** This input represents the input to delete a team. */
export type DeleteTeamInput = {
  /** The identifier of the team. */
  id: Scalars['ID']['input'];
};

/** This input represents the input to delete a user. */
export type DeleteUserInput = {
  /** The ID of the user to delete. */
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a user to a team. */
  addUserToTeam: User;
  /** Creates a team. */
  createTeam: Team;
  /** Creates a user. */
  createUser: User;
  /** Deletes a team. */
  deleteTeam: Team;
  /** Deletes a user. */
  deleteUser: User;
  /** Removes a user from a team. */
  removeUserFromTeam: User;
  /** Updates a team. */
  updateTeam: Team;
  /** Updates a user. */
  updateUser: User;
};

export type MutationaddUserToTeamArgs = {
  input: AddUserToTeamInput;
};

export type MutationcreateTeamArgs = {
  input: CreateTeamInput;
};

export type MutationcreateUserArgs = {
  input: CreateUserInput;
};

export type MutationdeleteTeamArgs = {
  input: DeleteTeamInput;
};

export type MutationdeleteUserArgs = {
  input: DeleteUserInput;
};

export type MutationremoveUserFromTeamArgs = {
  input: RemoveUserFromTeamInput;
};

export type MutationupdateTeamArgs = {
  input: UpdateTeamInput;
};

export type MutationupdateUserArgs = {
  input: UpdateUserInput;
};

/**
 * An interface for objects with a Globally Unique ID.
 *
 * @see https://graphql.org/learn/global-object-identification/
 */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** This type represents an optimistic lock error. */
export type OptimisticLockError = BusinessError & {
  __typename?: 'OptimisticLockError';
  /** The message of the optimistic lock error. */
  message: Scalars['String']['output'];
};

/**
 * An object representing pagination information.
 * Used in cursor-based pagination based on the GraphQL Relay specification.
 * This object provides information for efficiently navigating through result sets.
 *
 * @see [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm)
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last edge in the set. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /**
   * `hasNextPage` is used to indicate whether more edges exist following the set defined by the clients arguments.
   * If the client is paginating with `first`/`after`, then the server must return **true** if further edges exist, otherwise **false**.
   * If the client is paginating with `last`/`before`, then the client may return **true** if edges further from `before` exist, if it can do so efficiently, otherwise may return **false**.
   */
  hasNextPage: Scalars['Boolean']['output'];
  /**
   * `hasPreviousPage` is used to indicate whether more edges exist prior to the set defined by the clients arguments.
   * If the client is paginating with `last`/`before`, then the server must return **true** if prior edges exist, otherwise **false**.
   * If the client is paginating with first/after, then the client may return **true** if edges prior to `after` exist, if it can do so efficiently, otherwise may return **false**.
   */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The cursor of the first edge in the set. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Returns a team by ID. */
  team?: Maybe<Team>;
  /** Returns a list of teams sorted by name. */
  teams: TeamConnection;
  /**
   * Returns a user by ID.
   *
   * It is not possible to get users of other tenants.
   */
  user?: Maybe<User>;
  /**
   * Returns a list of users sorted by name.
   *
   * It is not possible to get users of other tenants.
   */
  users: UserConnection;
};

export type QuerynodeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryteamArgs = {
  id: Scalars['ID']['input'];
};

export type QueryteamsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};

export type QueryuserArgs = {
  id: Scalars['ID']['input'];
};

export type QueryusersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};

/** This input represents the input to remove a user from a team. */
export type RemoveUserFromTeamInput = {
  /** The ID of the team to remove the user from. */
  teamId: Scalars['ID']['input'];
  /** The ID of the user to remove from the team. */
  userId: Scalars['ID']['input'];
};

/**
 * The role of the user.
 *
 * - `USER`: A regular user.
 * - `ADMIN`: An admin user.
 */
export type Role = 'ADMIN' | 'USER';

/** This object represents a team. */
export type Team = Node & {
  __typename?: 'Team';
  /** The description of the team. */
  description?: Maybe<Scalars['String']['output']>;
  /** The identifier of the team. */
  id: Scalars['ID']['output'];
  /**
   * The members of the team.
   *
   * The list is sorted by name.
   */
  members: TeamMemberConnection;
  /** The name of the team. */
  name: Scalars['NonEmptyString']['output'];
};

/** This object represents a team. */
export type TeammembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};

export type TeamConnection = {
  __typename?: 'TeamConnection';
  edges: Array<TeamEdge>;
  pageInfo: PageInfo;
};

export type TeamEdge = {
  __typename?: 'TeamEdge';
  cursor: Scalars['String']['output'];
  node: Team;
};

export type TeamMemberConnection = {
  __typename?: 'TeamMemberConnection';
  edges: Array<TeamMemberEdge>;
  pageInfo: PageInfo;
};

export type TeamMemberEdge = {
  __typename?: 'TeamMemberEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

/** This input represents the input to update a team. */
export type UpdateTeamInput = {
  /** The description of the team. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The identifier of the team. */
  id: Scalars['ID']['input'];
  /** The name of the team. */
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

/** This input represents the input to update a user. */
export type UpdateUserInput = {
  /** The email address of the user. */
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  /** The ID of the user to update. */
  id: Scalars['ID']['input'];
  /** The name of the user. */
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
  /** The role of the user. */
  role?: InputMaybe<Role>;
  /** The ID of the team to which the user belongs. */
  teamId?: InputMaybe<Scalars['ID']['input']>;
};

/** This object represents a user. */
export type User = Node & {
  __typename?: 'User';
  /** The email address of the user. */
  email: Scalars['EmailAddress']['output'];
  /** The identifier of the user. */
  id: Scalars['ID']['output'];
  /** The name of the user. */
  name: Scalars['NonEmptyString']['output'];
  /** The role of the user. */
  role: Role;
  /**
   * The teams to which the user belongs.
   *
   * The list is sorted by name.
   */
  teams: TeamConnection;
};

/** This object represents a user. */
export type UserteamsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  BusinessError: OptimisticLockError & { __typename: 'OptimisticLockError' };
  Node: (TeamMapper & { __typename: 'Team' }) | (UserMapper & { __typename: 'User' });
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddUserToTeamInput: AddUserToTeamInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  BusinessError: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BusinessError']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  CreateTeamInput: CreateTeamInput;
  CreateUserInput: CreateUserInput;
  DeleteTeamInput: DeleteTeamInput;
  DeleteUserInput: DeleteUserInput;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']['output']>;
  OptimisticLockError: ResolverTypeWrapper<OptimisticLockError>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Query: ResolverTypeWrapper<{}>;
  RemoveUserFromTeamInput: RemoveUserFromTeamInput;
  Role: ResolverTypeWrapper<'USER' | 'ADMIN'>;
  Team: ResolverTypeWrapper<TeamMapper>;
  TeamConnection: ResolverTypeWrapper<
    Omit<TeamConnection, 'edges'> & { edges: Array<ResolversTypes['TeamEdge']> }
  >;
  TeamEdge: ResolverTypeWrapper<Omit<TeamEdge, 'node'> & { node: ResolversTypes['Team'] }>;
  TeamMemberConnection: ResolverTypeWrapper<
    Omit<TeamMemberConnection, 'edges'> & { edges: Array<ResolversTypes['TeamMemberEdge']> }
  >;
  TeamMemberEdge: ResolverTypeWrapper<
    Omit<TeamMemberEdge, 'node'> & { node: ResolversTypes['User'] }
  >;
  UpdateTeamInput: UpdateTeamInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<UserMapper>;
  UserConnection: ResolverTypeWrapper<
    Omit<UserConnection, 'edges'> & { edges: Array<ResolversTypes['UserEdge']> }
  >;
  UserEdge: ResolverTypeWrapper<Omit<UserEdge, 'node'> & { node: ResolversTypes['User'] }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddUserToTeamInput: AddUserToTeamInput;
  ID: Scalars['ID']['output'];
  BusinessError: ResolversInterfaceTypes<ResolversParentTypes>['BusinessError'];
  String: Scalars['String']['output'];
  CreateTeamInput: CreateTeamInput;
  CreateUserInput: CreateUserInput;
  DeleteTeamInput: DeleteTeamInput;
  DeleteUserInput: DeleteUserInput;
  EmailAddress: Scalars['EmailAddress']['output'];
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  NonEmptyString: Scalars['NonEmptyString']['output'];
  NonNegativeInt: Scalars['NonNegativeInt']['output'];
  OptimisticLockError: OptimisticLockError;
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean']['output'];
  Query: {};
  RemoveUserFromTeamInput: RemoveUserFromTeamInput;
  Team: TeamMapper;
  TeamConnection: Omit<TeamConnection, 'edges'> & {
    edges: Array<ResolversParentTypes['TeamEdge']>;
  };
  TeamEdge: Omit<TeamEdge, 'node'> & { node: ResolversParentTypes['Team'] };
  TeamMemberConnection: Omit<TeamMemberConnection, 'edges'> & {
    edges: Array<ResolversParentTypes['TeamMemberEdge']>;
  };
  TeamMemberEdge: Omit<TeamMemberEdge, 'node'> & { node: ResolversParentTypes['User'] };
  UpdateTeamInput: UpdateTeamInput;
  UpdateUserInput: UpdateUserInput;
  User: UserMapper;
  UserConnection: Omit<UserConnection, 'edges'> & {
    edges: Array<ResolversParentTypes['UserEdge']>;
  };
  UserEdge: Omit<UserEdge, 'node'> & { node: ResolversParentTypes['User'] };
};

export type BusinessErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BusinessError'] = ResolversParentTypes['BusinessError'],
> = {
  __resolveType?: TypeResolveFn<'OptimisticLockError', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  addUserToTeam?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationaddUserToTeamArgs, 'input'>
  >;
  createTeam?: Resolver<
    ResolversTypes['Team'],
    ParentType,
    ContextType,
    RequireFields<MutationcreateTeamArgs, 'input'>
  >;
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationcreateUserArgs, 'input'>
  >;
  deleteTeam?: Resolver<
    ResolversTypes['Team'],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteTeamArgs, 'input'>
  >;
  deleteUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteUserArgs, 'input'>
  >;
  removeUserFromTeam?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationremoveUserFromTeamArgs, 'input'>
  >;
  updateTeam?: Resolver<
    ResolversTypes['Team'],
    ParentType,
    ContextType,
    RequireFields<MutationupdateTeamArgs, 'input'>
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationupdateUserArgs, 'input'>
  >;
};

export type NodeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node'],
> = {
  __resolveType?: TypeResolveFn<'Team' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export interface NonEmptyStringScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export type OptimisticLockErrorResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['OptimisticLockError'] = ResolversParentTypes['OptimisticLockError'],
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo'],
> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  node?: Resolver<
    Maybe<ResolversTypes['Node']>,
    ParentType,
    ContextType,
    RequireFields<QuerynodeArgs, 'id'>
  >;
  team?: Resolver<
    Maybe<ResolversTypes['Team']>,
    ParentType,
    ContextType,
    RequireFields<QueryteamArgs, 'id'>
  >;
  teams?: Resolver<
    ResolversTypes['TeamConnection'],
    ParentType,
    ContextType,
    Partial<QueryteamsArgs>
  >;
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryuserArgs, 'id'>
  >;
  users?: Resolver<
    ResolversTypes['UserConnection'],
    ParentType,
    ContextType,
    Partial<QueryusersArgs>
  >;
};

export type RoleResolvers = EnumResolverSignature<
  { ADMIN?: any; USER?: any },
  ResolversTypes['Role']
>;

export type TeamResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team'],
> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  members?: Resolver<
    ResolversTypes['TeamMemberConnection'],
    ParentType,
    ContextType,
    Partial<TeammembersArgs>
  >;
  name?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamConnectionResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['TeamConnection'] = ResolversParentTypes['TeamConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['TeamEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['TeamEdge'] = ResolversParentTypes['TeamEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Team'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamMemberConnectionResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['TeamMemberConnection'] = ResolversParentTypes['TeamMemberConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['TeamMemberEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamMemberEdgeResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['TeamMemberEdge'] = ResolversParentTypes['TeamMemberEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  teams?: Resolver<
    ResolversTypes['TeamConnection'],
    ParentType,
    ContextType,
    Partial<UserteamsArgs>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  BusinessError?: BusinessErrorResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  OptimisticLockError?: OptimisticLockErrorResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers;
  Team?: TeamResolvers<ContextType>;
  TeamConnection?: TeamConnectionResolvers<ContextType>;
  TeamEdge?: TeamEdgeResolvers<ContextType>;
  TeamMemberConnection?: TeamMemberConnectionResolvers<ContextType>;
  TeamMemberEdge?: TeamMemberEdgeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
};
