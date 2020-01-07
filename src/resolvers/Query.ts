import jwt from "jsonwebtoken";

/**
 * The main Query object
 */
const Query = {
  /**
   * The user query
   *
   * @param root parent
   * @param args arguments
   * @param ctx context
   *
   * Returns the user information
   */
  async user(root: any, args: any, ctx: any) {
    // Check if user is looged in.
    if (!args.token) {
      return null;
    }

    // Check if the token is valid
    try {
      const user = jwt.verify(args.token, "ke-taxi");
      try {
        return ctx.prisma.user({ id: (user as any).user.id });
      } catch (e) {
        throw Error(e.message);
      }
    } catch (err) {
      throw new Error("You are no longer signed in.");
    }
  },

  /**
   * The users query
   *
   * @param root parent
   * @param args arguments
   * @param ctx context
   *
   * Returns the list of users information
   */
  async users(root: any, args: any, ctx: any) {
    try {
      return ctx.prisma.users();
    } catch (e) {
      throw Error(e.message);
    }
  }
};

export { Query };
