"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./server"));
const schema_1 = require("@graphql-tools/schema");
const auth_middleware_1 = require("./middleware/auth.middleware");
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = require("./graphql/resolvers");
const port = process.env.PORT || 4000;
dotenv_1.default.config({ path: './.env' });
process.on('uncaughtException', (error) => {
    console.log(`${error.name} : ${error.message}`);
    process.exit(1);
});
const database = process.env.HOSTED_DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
const httpServer = http_1.default.createServer(server_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Required logic for integrating with Express
    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new apollo_server_express_1.ApolloServer({
        schema: (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.typeDefs, resolvers: resolvers_1.resolvers }),
        context: ({ req }) => {
            const token = req.get('Authorization') || '';
            const authenticated = (0, auth_middleware_1.auth)(token);
            return { authenticated };
        },
    });
    // app.use(serverExpress)
    // More required logic for integrating with Express
    try {
        yield mongoose_1.default.connect(database);
        console.log('DB connection successful!');
    }
    catch (error) {
        console.log(error);
    }
    yield server.start();
    server.applyMiddleware({
        app: server_1.default,
        // By default, apollo-server hosts its GraphQL endpoint at the
        // server root. However, *other* Apollo Server packages host it at
        // /graphql. Optionally provide this to match apollo-server.
        path: '/graphql',
    });
    // app.all('*', (req: Request, _: Response, next: NextFunction) =>
    //   next(
    //     new errorHandler({
    //       message: `Can't find ${req.originalUrl} on this server`,
    //       statusCode: 404,
    //     }),
    //   ),
    // )
    // Modified server startup
    yield new Promise(resolve => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}))();
//# sourceMappingURL=app.js.map