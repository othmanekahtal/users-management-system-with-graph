import ErrorHandler from '@utils/errorHandler'
import {NextFunction, Request, Response} from 'express'
const errorDev = (error: ErrorHandler, res: Response) => {
  console.log(error)
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error,
    stack: error.stack,
  })
}

const errorProd = (error: ErrorHandler, res: Response) =>
  error.isOperational
    ? res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      })
    : res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
      })

export default (
  error: ErrorHandler,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  error.statusCode ||= 500
  error.status ||= 'error'
  if (process.env.NODE_ENV === 'development') {
    errorDev(error, res)
  } else if (process.env.NODE_ENV === 'production') {
    let err: ErrorHandler = {
      ...error,
      name: error.name,
      message: error.message,
    }

    // to identify errors happens in duplicate unique field code = 11000

    if (err.name === 'JsonWebTokenError') {
      err = new ErrorHandler({
        statusCode: 401,
        message: 'You are not authorized !',
      })
    }
    errorProd(err, res)
  }
}
