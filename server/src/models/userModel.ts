import userSchema from '@schemas/user.schema'
import mongoose from 'mongoose'
import {UserBaseDocument} from '@entities/UserBaseDocument.entity'
export default mongoose.model<UserBaseDocument>('user', userSchema)
