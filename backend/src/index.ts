import "reflect-metadata";
import { Updoot } from './entities/Updoot';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { MyContext } from "src/types";
import { PostsResolver } from "./resolvers/post";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from 'typeorm';
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import path from 'path';

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "hackfacebook",
    password: "Ericsson1!",
    username: "postgres",
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    synchronize: true,
    entities: [User, Post, Updoot]
  });

  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 360 * 10, // 10 ani
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: __prod__, // numai https
      },
      saveUninitialized: false,
      secret: "nush",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostsResolver, UserResolver],
      validate: false,
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
      }),
    ],
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("listen");
  });
};

main().catch((err) => console.log(err));
