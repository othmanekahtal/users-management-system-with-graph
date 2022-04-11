import {ApolloServer} from 'apollo-server-express'
import http from 'http'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './server'
import {makeExecutableSchema} from '@graphql-tools/schema'
import {auth} from 'middleware/auth.middleware'
import {typeDefs} from 'graphql/typeDefs'
import {resolvers} from 'graphql/resolvers'
const port = process.env.PORT || 4000

dotenv.config({path: './.env'})
process.on('uncaughtException', (error: Error) => {
  console.log(`${error.name} : ${error.message}`)
  process.exit(1)
})

const database = process.env.HOSTED_DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
)

const httpServer = http.createServer(app)

;(async () => {
  // Required logic for integrating with Express

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema: makeExecutableSchema({typeDefs, resolvers}),
    context: ({req}) => {
      const token = req.get('Authorization') || ''
      const authenticated = auth(token)
      return {authenticated}
    },
  })
  // app.use(serverExpress)
  // More required logic for integrating with Express
  try {
    await mongoose.connect(database)
    console.log('DB connection successful!')
  } catch (error) {
    console.log(error)
  }

  await server.start()
  server.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/graphql',
  })
  // app.all('*', (req: Request, _: Response, next: NextFunction) =>
  //   next(
  //     new errorHandler({
  //       message: `Can't find ${req.originalUrl} on this server`,
  //       statusCode: 404,
  //     }),
  //   ),
  // )

  // Modified server startup
  await new Promise<void>(resolve => httpServer.listen({port}, resolve))
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  )
})()
