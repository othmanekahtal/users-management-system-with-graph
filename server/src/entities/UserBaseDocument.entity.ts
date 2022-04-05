import {User} from '@dto/User.dto'
import {Document, Types} from 'mongoose'
export interface UserBaseDocument extends User, Document {
  _id: Types.ObjectId
}
