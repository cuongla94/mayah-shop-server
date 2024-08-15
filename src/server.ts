import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import { GraphqlSchema } from './graphql';
import { connectToHavenlyDb, closeConnection } from './services';
import Logger from './loaders/logger';
import { config } from './config';

dotenv.config();

interface MyContext {
  token?: string;
}

const startServer = async () => {
  const app: Application = express();
  const httpServer = http.createServer(app);

  try {
    const db = await connectToHavenlyDb();

    const server = new ApolloServer<MyContext>({
      schema: GraphqlSchema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      introspection: true,  // Enable introspection
    });

    await server.start();

    const corsOptions = {
      origin: [
        'http://localhost:3000', 
        'https://mayah-shop-ui.vercel.app/',
        'https://mayahshop.net',
        'http://161.35.231.58',
      ],
      methods: ['GET', 'POST', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    };

    app.options('*', cors(corsOptions)); 

    app.use(
      '/graphql',
      cors(corsOptions),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token, db }),
      }),
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: process.env.PORT || config.port }, resolve)
    );
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      🌐 http://localhost:${config.port}/graphql
      ################################################
    `);
  } catch (error) {
    Logger.error(error);
    await closeConnection();
  }
};

startServer();
