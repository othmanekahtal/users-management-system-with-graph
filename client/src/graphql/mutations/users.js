import {gql} from '@apollo/client'

const DELETE_USER_MUTATION = gql`
  mutation Mutation($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      message
      success
      code
    }
  }
`
const UPDATE_USER_MUTATION = gql`
  mutation Mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
    }
  }
`
const CREATE_USER_MUTATION = gql`
  mutation Mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      success
    }
  }
`
const AUTHORIZE_USER_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    authorizeUser(email: $email, password: $password) {
      token
      user {
        email
        lastName
        firstName
        id
      }
    }
  }
`
export {
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  CREATE_USER_MUTATION,
  AUTHORIZE_USER_MUTATION,
}
