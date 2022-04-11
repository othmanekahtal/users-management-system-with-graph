import userModel from '@models/userModel'
import {sign} from 'jsonwebtoken'

import {Resolvers} from 'generated/graphql'
import {Types} from 'mongoose'
const generateToken = (id: Types.ObjectId) => {
  console.log(id)
  return sign({id}, process.env.JWT_SECRET, {
    expiresIn: '90d',
  })
}
export const resolvers: Resolvers = {
  Query: {
    getUser: async (_, {id}, authenticated) => {
      try {
        if (!authenticated) {
          return await userModel.findById(id)
        }
      } catch (_) {
        throw new Error('Error while fetching user')
      }
      return null
    },
    getUsers: async (_, __, authenticated) => {
      console.log(authenticated)
      try {
        if (authenticated) {
          return await userModel.find({})
        }
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
        let user = await userModel.findOne({email, password})
        if (!user) {
          throw new Error("Can't authenticate user")
        }
        user.id = user._id
        user = {...user}
        const token = generateToken(user.id)
        return {
          user: user,
          token,
        }
      } catch (error) {
        throw new Error(`Error while authenticating user: ${error}`)
      }
    },
    updateUser: async (_, {input}, authenticated) => {
      const {id, ...user} = input

      try {
        if (!authenticated) {
          throw new Error('endpoint not authorized')
        }

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
    deleteUser: (_, {input}, authenticated) => {
      const {id} = input
      try {
        if (!authenticated) {
          throw new Error('endpoint not authorized')
        }
        userModel.findByIdAndDelete(id)
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
