import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TeamMapper } from './team/schema.mappers';
import { UserMapper } from './user/schema.mappers';
import { Context } from '../context';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date | string; output: Date | string; }
  EmailAddress: { input: string; output: string; }
  NonEmptyString: { input: string; output: string; }
  UUID: { input: string; output: string; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToTeam: User;
  createTeam: Team;
  createUser: User;
  deleteTeam?: Maybe<Team>;
  deleteUser?: Maybe<User>;
  removeUserFromTeam: User;
  updateTeam?: Maybe<Team>;
  updateUser?: Maybe<User>;
};


export type MutationaddUserToTeamArgs = {
  teamId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type MutationcreateTeamArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['NonEmptyString']['input'];
};


export type MutationcreateUserArgs = {
  email: Scalars['EmailAddress']['input'];
  name: Scalars['NonEmptyString']['input'];
  teamId?: InputMaybe<Scalars['UUID']['input']>;
};


export type MutationdeleteTeamArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteUserArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationremoveUserFromTeamArgs = {
  teamId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type MutationupdateTeamArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
};


export type MutationupdateUserArgs = {
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
  teamId?: InputMaybe<Scalars['UUID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  team?: Maybe<Team>;
  teams: Array<Team>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryteamArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryuserArgs = {
  id: Scalars['UUID']['input'];
};

export type Team = {
  __typename?: 'Team';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  members: Array<User>;
  name: Scalars['NonEmptyString']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['EmailAddress']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['NonEmptyString']['output'];
  teams: Array<Team>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Team: ResolverTypeWrapper<TeamMapper>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  User: ResolverTypeWrapper<UserMapper>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  Mutation: {};
  String: Scalars['String']['output'];
  NonEmptyString: Scalars['NonEmptyString']['output'];
  Query: {};
  Team: TeamMapper;
  UUID: Scalars['UUID']['output'];
  User: UserMapper;
  Boolean: Scalars['Boolean']['output'];
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addUserToTeam?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationaddUserToTeamArgs, 'teamId' | 'userId'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationcreateTeamArgs, 'name'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'email' | 'name'>>;
  deleteTeam?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<MutationdeleteTeamArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationdeleteUserArgs, 'id'>>;
  removeUserFromTeam?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationremoveUserFromTeamArgs, 'teamId' | 'userId'>>;
  updateTeam?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<MutationupdateTeamArgs, 'id'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'id'>>;
};

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<QueryteamArgs, 'id'>>;
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type TeamResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UUIDScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['NonEmptyString'], ParentType, ContextType>;
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NonEmptyString?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

