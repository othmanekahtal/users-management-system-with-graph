import {UserBaseDocument} from '@entities/UserBaseDocument.entity'
import userModel from '@models/userModel'
import {QueryOptions, UpdateQuery, Types} from 'mongoose'
import {
  find,
  findByIdAndUpdate,
  findOne,
  save,
} from './providers/mongoose.service'
export const getAllUser = async ({...options}) =>
  await find<UserBaseDocument>(userModel, options)

export const getSPecificUser = async ({...options}) =>
  await findOne<UserBaseDocument>(userModel, options)
export const updateUser = async (
  id: Types.ObjectId,
  fields: UpdateQuery<UserBaseDocument>,
  options?: QueryOptions,
) => await findByIdAndUpdate<UserBaseDocument>(userModel, id, fields, options)
export const saveUser = async (
  document: UserBaseDocument,
  options?: QueryOptions,
) => await save<UserBaseDocument>(document, options)
