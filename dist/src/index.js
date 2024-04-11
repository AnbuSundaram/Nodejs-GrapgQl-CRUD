"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const resolvers_1 = require("./resolvers");
const mongo_1 = require("./utils/mongo");
const jwt_1 = require("./utils/jwt");
const authChecker_1 = __importDefault(require("./utils/authChecker"));
async function bootstrap() {
    /** Build schema */
    const schema = await (0, type_graphql_1.buildSchema)({
        // resolvers: [__dirname + "/resolvers/**/*.ts"],
        resolvers: resolvers_1.resolvers,
        authChecker: authChecker_1.default,
    });
    /** Init express */
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    /** Create apollo server */
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        //context: ctx => ctx,
        context: (ctx) => {
            // return {
            //   ...ctx,
            //   req: ctx.req,
            //   res: ctx.res,
            // };
            const context = ctx;
            if (ctx.req.cookies.accessToken) {
                const user = (0, jwt_1.verifyJwt)(ctx.req.cookies.accessToken);
                context.user = user;
            }
            return context;
        },
        plugins: [
            process.env.NODE_ENV === 'production'
                ? (0, apollo_server_core_1.ApolloServerPluginLandingPageProductionDefault)()
                : (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)({
                    settings: {
                        'request.credentials': 'include',
                    },
                }),
        ],
    });
    /** await server.start() */
    await server.start();
    /** apply middleware to server */
    server.applyMiddleware({ app });
    /** app.listen on express server */
    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
    /** Connect to db */
    (0, mongo_1.connectToMongo)();
}
bootstrap();
