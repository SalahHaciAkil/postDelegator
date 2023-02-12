import { ApolloServer, gql } from "apollo-server-express";
import cron from "node-cron";
import express from "express";
import cors from "cors";
import typeDefs from "./graphql/types";
import resolvers from "./graphql/resolvers";
import { dbConnect, dropTables, seedDatabase } from "./helpers/db";
import { EVERY_10_MINUTES } from "./helpers/constants";
import { processPendingPosts } from "./graphql/controllers/postController";
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function startServerAndDB() {
  await server.start();
  await dbConnect();
  await seedDatabase();
  // For testing purposes only
  // await dropTables();
  app.use(cors());

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

cron.schedule(EVERY_10_MINUTES, () => {
  processPendingPosts();
});

startServerAndDB();
