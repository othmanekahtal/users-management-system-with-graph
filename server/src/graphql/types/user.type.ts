import {gql} from 'apollo-server-core'

const user = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
  type MutationUserAuthentication {
    token: String!
    user: User!
  }
  type MutateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }
  type DeleteUserResponse {
    code: Int!
    success: Boolean!
    message: String!
  }
  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UpdateUserInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
  }
  input DeleteUserInput {
    id: ID!
  }
  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }
  type Mutation {
    createUser(input: CreateUserInput!): MutateUserResponse
    authorizeUser(email: String!, password: String!): MutationUserAuthentication
    updateUser(input: UpdateUserInput!): MutateUserResponse!
    deleteUser(input: DeleteUserInput!): DeleteUserResponse!
  }
`
export default user
