import {ErrorHandlerDefinition} from '@interfaces/ErrorHandlerDefinition'
export default class ErrorHandler extends Error {
  [x: string]: unknown
  statusCode: number
  status: string
  isOperational: boolean
  constructor({message, statusCode}: ErrorHandlerDefinition) {
    super(message)
    this.statusCode = statusCode
    this.status = statusCode.toString().startsWith('4') ? 'failed' : 'error'
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}
