import 'reflect-metadata';
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import { initialize, AppDataSource } from './config/data-source';
import { UserResolver, StudyResolver, StudyTagResolver } from './resolvers';

const main = async () => {

  // expressのバージョンをダウングレード
  const app = express();

  initialize();

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: 'http://localhost:3000',

    }),
  )

  // type-graphqlはgraphql15.3.0以降のバージョンをサポートしていないため、GraphQLのバージョンは15.3.0とする
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [StudyResolver, UserResolver, StudyTagResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  

  app.listen(4000, () => console.log('Server listning ...OK'));
};

main().catch((err) => {
  // サーバーの起動に失敗した場合はデータベースとの接続を破棄する
  AppDataSource.destroy();
  console.log('Database connection ...NO');

  console.log('Server listning ...NO');
  console.error(err);
});