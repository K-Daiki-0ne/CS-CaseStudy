import 'reflect-metadata';
import Express from 'express';
import { ApolloServer } from "apollo-server-express";
// import { buildSchema } from "type-graphql";
import { readEnviroment } from './utils/constant';
import { initialize } from './config/data-source';

const main = async () => {
    const app = Express();
    initialize();
    readEnviroment();

    const apolloServer = new ApolloServer({
        // schema: await buildSchema(),
        context: ({ req, res }) => ({
            req,
            res,
        }),
    })

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => console.log('Server listning ...OK'));
};

main().catch((err) => {
    console.log('Server listning ...NO');
    console.error(err);
});