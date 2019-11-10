import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import resolvers from "./resolvers";

// Creating server options
const serverOptions = {
  context: {
    prisma
  },
  resolvers,
  typeDefs: "./src/schema.graphql"
};

// Instatiating GraphQL-Yoga server
const server = new GraphQLServer(serverOptions);

// Starting the server
server.start();

export { server };
