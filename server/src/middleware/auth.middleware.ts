import jwt from 'jsonwebtoken'

const {JWT_SECRET} = process.env
export const auth = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET as string)
    }
    return null
  } catch (error) {
    return null
  }
}
