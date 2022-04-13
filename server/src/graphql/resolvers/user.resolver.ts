import userModel from '@models/user.model'
import {sign} from 'jsonwebtoken'
import {AuthenticationError, UserInputError} from 'apollo-server-express'
import {Resolvers} from 'generated/graphql'
import {Types} from 'mongoose'
const generateToken = (id: Types.ObjectId) => {
  console.log(process.env.JWT_SECRET)
  return sign({id}, process.env.JWT_SECRET, {
    expiresIn: '90d',
  })
}
function willAuthenticate(authenticated: null | {[x: string]: string}) {
  if (!authenticated) {
    throw new AuthenticationError('you must be logged in')
  }
}
export const resolvers: Resolvers = {
  Query: {
    getUser: async (_, {id}, {authenticated}) => {
      willAuthenticate(authenticated)
      try {
        return await userModel.findById(id)
      } catch (_) {
        throw new Error('Error while fetching user')
      }
      return null
    },
    getUsers: async (_, __, {authenticated}) => {
      willAuthenticate(authenticated)

      try {
        return await userModel.find({})
      } catch (error) {
        throw new Error('Error while fetching users')
      }
      return null
    },
  },
  Mutation: {
    createUser: async (_, {input}) => {
      console.log(input)

      try {
        const user = await userModel.create(input)
        return {
          user,
          code: 201,
          success: true,
          message: 'user created successfully',
        }
      } catch (error) {
        console.log(error)
        throw new Error(`we can't create user in this moment try again later`)
      }
    },
    authorizeUser: async (_, {email, password}) => {
      try {
        const user = await userModel.findOne({email, password})
        if (!user) {
          throw new Error("User doesn't exist")
        }
        const token = generateToken(user.id)
        return {
          user,
          token,
        }
      } catch (error) {
        throw new UserInputError(`email or password is incorrect !`)
      }
    },
    updateUser: async (_, {input}, {authenticated}) => {
      const {id, ...user} = input
      willAuthenticate(authenticated)
      try {
        const newUser = await userModel.findByIdAndUpdate(id, user, {
          new: true,
        })
        return {
          user: newUser,
          code: 200,
          success: true,
          message: 'user updated successfully',
        }
      } catch (error) {
        throw new Error("Can't update user")
      }
    },
    deleteUser: async (_, {input}, {authenticated}) => {
      const {id} = input
      willAuthenticate(authenticated)
      try {
        const deletedUser = await userModel.findByIdAndDelete(id)
        if (!deletedUser)
          return {
            code: 400,
            success: false,
            message: 'user not found',
          }

        return {
          code: 200,
          success: true,
          message: 'user deleted successfully',
        }
      } catch (error) {
        throw new Error("Can't delete user")
      }
    },
  },
}
