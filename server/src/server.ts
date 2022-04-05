import express, {NextFunction, Request, Response} from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
const server = express()
import errorHandler from '@utils/errorHandler'
import ErrorException from '@controllers/errorException.controller'
import cookieParser from 'cookie-parser'
import userRoutes from '@routes/user.route'

// 1) GLOBAL MIDDLEWARE

// Set security HTTP headers
server.use(helmet())
server.use(cookieParser())
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

// Serving static files
server.use(express.static(`${__dirname}/public`))

server.use('/api/v1', userRoutes)

server.all('*', (req: Request, _: Response, next: NextFunction) =>
  next(
    new errorHandler({
      message: `Can't find ${req.originalUrl} on this server`,
      statusCode: 404,
    }),
  ),
)

/*
we create a central middleware for handle all errors
 */
server.use(ErrorException)

export default server
