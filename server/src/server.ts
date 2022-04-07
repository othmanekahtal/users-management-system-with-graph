import express from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import ErrorException from '@controllers/errorException.controller'

const server = express()

// Set security HTTP headers
server.use(helmet())
// Development logging
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'))
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
server.use('/api', limiter)

// Body parser, reading data from body into req.body
server.use(express.json({limit: '10kb'}))

// Data sanitization against NoSQL query injection
server.use(mongoSanitize())

// Data sanitization against XSS
// convert all html or malicious code to symbols
server.use(xss())

/*
we create a central middleware for handle all errors
 */
server.use(ErrorException)

export default server
