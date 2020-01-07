import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import resolvers from "./resolvers";

// Create a GraphQL-Yoga server
const createServer = () =>
  new GraphQLServer({
    context: req => ({
      prisma,
      ...req
    }),
    resolvers,
    typeDefs: __dirname + "/schema.graphql"
  });

export default createServer;
