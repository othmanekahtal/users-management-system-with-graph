import {verify} from 'jsonwebtoken'

export const auth = (token: string) => {
  const secret = process.env.JWT_SECRET
  try {
    if (token) {
      return verify(token.replace('Bearer ', ''), secret)
    }
  } catch (error) {
    console.log(error)

    throw new Error("Can't authenticate user")
  }
  return null
}
