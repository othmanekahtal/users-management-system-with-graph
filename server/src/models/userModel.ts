import userSchema from '@models/schemas/user.schema'
import mongoose from 'mongoose'
export default mongoose.model('user', userSchema)
