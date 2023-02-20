import { ApolloServer } from "@apollo/server";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { expressMiddleware as ApolloExpress } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cron from "node-cron";
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import typeDefs from "./graphql/types";
import resolvers from "./graphql/resolvers";
import { dbConnect, dropTables, seedDatabase } from "./helpers/db";
import { EVERY_10_MINUTES } from "./helpers/constants";
import { processPendingPosts } from "./graphql/controllers/postController";
import { PORT } from "./config/env";
import batches from "./graphql/loadBatches";
import DataLoader from "dataloader";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema });
const app = express();
const { batchPersons, batchSegments, batchPersonsBySegmentId } = batches;
async function startServerAndDB() {
  await server.start();
  await dbConnect();
  await seedDatabase();
  // For testing purposes only
  // await dropTables();
  app.use(
    "/graphql",
    cors(),
    json(),
    ApolloExpress(server, {
      context: (context: ExpressContext): any => {
        const { req, res } = context;
        const personsLoader = new DataLoader(batchPersons);
        const segmentsLoader = new DataLoader(batchSegments);
        const personsBySegmentIdLoader = new DataLoader(
          batchPersonsBySegmentId
        );
        return {
          req,
          res,
          personsLoader,
          segmentsLoader,
          personsBySegmentIdLoader,
        };
      },
    })
  );

  // server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
  );
}

cron.schedule("*/10 *  * * * *", () => {
  processPendingPosts();
});

startServerAndDB();
