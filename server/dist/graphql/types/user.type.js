"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const User = (0, apollo_server_express_1.gql) `
  " User type definition"
  type User {
    "User id"
    id: ID!
    "first name of user"
    firstName: String!
    "last name of user"
    lastName: String!
    "email of user"
    email: String!
    "password of user"
    password: String!
  }
  "type of response when getting user"
  type MutateUserResponse {
     "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    user: User
  }
  type DeleteUserResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
  }
  " input type for creating a user"
  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  "input type for updating a user"
  input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }
  "input type for deleting a user"
  input DeleteUserInput {
    id: ID!
  }
  type Query {
   "Get user by id"
    getUser(id: ID!): User
    "Get all users"
    getUsers: [User]
  }
  type Mutation {
    "Mutation to create a new user"
    createUser(input: CreateUserInput): MutateUserResponse!
    "Mutation to sign in user"
    authorizeUser(email: String!, password: String!): User
    "Mutation to update a user"
    updateUser(input: UpdateUserInput): MutateUserResponse!
    "Mutation to delete a user"
    deleteUser(input: DeleteUserInput): DeleteUserResponse!
  }
`;
module.exports = User;
//# sourceMappingURL=user.type.js.map