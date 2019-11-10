import { Prisma } from "../generated/prisma-client";

// Defining Query methods
const Query = {
  // Query for users
  users(root: any, args: any, ctx: { prisma: Prisma }) {
    return ctx.prisma.users();
  }
};

export { Query };
