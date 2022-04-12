import userModel from '@models/user.model'
import {sign} from 'jsonwebtoken'

import {Resolvers} from 'generated/graphql'
import {Types} from 'mongoose'
const generateToken = (id: Types.ObjectId) => {
  console.log(process.env.JWT_SECRET)
  return sign({id}, process.env.JWT_SECRET, {
    expiresIn: '90d',
  })
}
export const resolvers: Resolvers = {
  Query: {
    getUser: async (_, {id}, {authenticated}) => {
      if (!authenticated) {
        throw new Error('You are not authenticated')
      }
      try {
        return await userModel.findById(id)
      } catch (_) {
        throw new Error('Error while fetching user')
      }
      return null
    },
    getUsers: async (_, __, {authenticated}) => {
      if (!authenticated) {
        throw new Error('You are not authenticated')
      }
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
      try {
        const user = await userModel.create(input)
        return {
          user,
          code: 201,
          success: true,
          message: 'user created successfully',
        }
      } catch (error) {
        throw new Error(`Error while creating user: ${error}`)
      }
    },
    authorizeUser: async (_, {email, password}) => {
      try {
        const user = await userModel.findOne({email, password})
        if (!user) {
          throw new Error("Can't authenticate user")
        }
        const token = generateToken(user.id)
        return {
          user,
          token,
        }
      } catch (error) {
        throw new Error(`Error while authenticating user: ${error}`)
      }
    },
    updateUser: async (_, {input}, {authenticated}) => {
      const {id, ...user} = input

      if (!authenticated) {
        throw new Error('endpoint not authorized')
      }
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
      if (!authenticated) {
        throw new Error('endpoint not authorized')
      }
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
