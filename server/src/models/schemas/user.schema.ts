import validator from 'validator'
import {Schema} from 'mongoose'
export default new Schema({
  firstName: {
    type: String,
    required: [true, 'An user must have a first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'An user must have a last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'An user must have an email'],
    unique: true,
    trim: true,
    validate: {
      message: 'An email is not valid !',
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: [true, 'An user must have a password'],
    trim: true,
  },
})
