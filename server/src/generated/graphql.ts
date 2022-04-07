import {GraphQLResolveInfo} from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type CreateUserInput = {
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  password: Scalars['String']
}

export type DeleteUserInput = {
  id: Scalars['ID']
}

export type GetUserResponse = {
  __typename?: 'GetUserResponse'
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']
  /** Human-readable message for the UI */
  message: Scalars['String']
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']
  /** Newly updated track after a successful mutation */
  user?: Maybe<User>
}

export type Mutation = {
  __typename?: 'Mutation'
  authorizeUser: GetUserResponse
  createUser: GetUserResponse
  deleteUser: GetUserResponse
  updateUser: GetUserResponse
}

export type MutationAuthorizeUserArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>
}

export type MutationDeleteUserArgs = {
  input?: InputMaybe<DeleteUserInput>
}

export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUserInput>
}

export type Query = {
  __typename?: 'Query'
  getUser: GetUserResponse
  getUsers?: Maybe<Array<Maybe<User>>>
}

export type QueryGetUserArgs = {
  id: Scalars['ID']
}

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  firstName: Scalars['String']
  id: Scalars['ID']
  lastName: Scalars['String']
  password: Scalars['String']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    {[key in TKey]: TResult},
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    {[key in TKey]: TResult},
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdditionalEntityFields: AdditionalEntityFields
  String: ResolverTypeWrapper<Scalars['String']>
  CreateUserInput: CreateUserInput
  DeleteUserInput: DeleteUserInput
  ID: ResolverTypeWrapper<Scalars['ID']>
  GetUserResponse: ResolverTypeWrapper<GetUserResponse>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  UpdateUserInput: UpdateUserInput
  User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdditionalEntityFields: AdditionalEntityFields
  String: Scalars['String']
  CreateUserInput: CreateUserInput
  DeleteUserInput: DeleteUserInput
  ID: Scalars['ID']
  GetUserResponse: GetUserResponse
  Int: Scalars['Int']
  Boolean: Scalars['Boolean']
  Mutation: {}
  Query: {}
  UpdateUserInput: UpdateUserInput
  User: User
}

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>
}

export type UnionDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = UnionDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>
}

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AbstractEntityDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>
}

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EntityDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>
}

export type ColumnDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = ColumnDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IdDirectiveArgs = {}

export type IdDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = IdDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>
}

export type LinkDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = LinkDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type EmbeddedDirectiveArgs = {}

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EmbeddedDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type MapDirectiveArgs = {
  path: Scalars['String']
}

export type MapDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = MapDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type GetUserResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GetUserResponse'] = ResolversParentTypes['GetUserResponse'],
> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  authorizeUser?: Resolver<
    ResolversTypes['GetUserResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationAuthorizeUserArgs, 'email' | 'password'>
  >
  createUser?: Resolver<
    ResolversTypes['GetUserResponse'],
    ParentType,
    ContextType,
    Partial<MutationCreateUserArgs>
  >
  deleteUser?: Resolver<
    ResolversTypes['GetUserResponse'],
    ParentType,
    ContextType,
    Partial<MutationDeleteUserArgs>
  >
  updateUser?: Resolver<
    ResolversTypes['GetUserResponse'],
    ParentType,
    ContextType,
    Partial<MutationUpdateUserArgs>
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  getUser?: Resolver<
    ResolversTypes['GetUserResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryGetUserArgs, 'id'>
  >
  getUsers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType
  >
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  GetUserResponse?: GetUserResponseResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>
  entity?: EntityDirectiveResolver<any, any, ContextType>
  column?: ColumnDirectiveResolver<any, any, ContextType>
  id?: IdDirectiveResolver<any, any, ContextType>
  link?: LinkDirectiveResolver<any, any, ContextType>
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>
  map?: MapDirectiveResolver<any, any, ContextType>
}

import {ObjectId} from 'mongodb'
