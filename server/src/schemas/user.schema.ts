import validator from 'validator'
import {Schema} from 'mongoose'
import {UserBaseDocument} from '@entities/UserBaseDocument.entity'
export default new Schema<UserBaseDocument>({
  firstName: {
    type: String,
    required: [true, 'An user must have a first name'],
    trim: true,
    maxlength: [40, 'An username must have less or equal then 40 characters'],
    minlength: [10, 'An username must have more or equal then 10 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'An user must have a last name'],
    trim: true,
    maxlength: [40, 'An username must have less or equal then 40 characters'],
    minlength: [10, 'An username must have more or equal then 10 characters'],
  },
  email: {
    type: String,
    required: [true, 'An user must have an email'],
    unique: true,
    trim: true,
    maxlength: [40, 'An email must have less or equal then 40 characters'],
    minlength: [10, 'An email must have more or equal then 10 characters'],
    validate: {
      message: 'An email is not valid !',
      validator: validator.isEmail,
    },
  },
})
