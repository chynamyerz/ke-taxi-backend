import bcrypt from "bcrypt";
import { Prisma, UserCreateInput } from "../generated/prisma-client";
import { validateEmail, validPassword } from "../util";

interface IContext {
  prisma: Prisma;
  user: { id: string };
}

/**
 * The main Mutation object
 */
const Mutation = {
  /**
   * Register a new user
   *
   * @param root root
   * @param args arguments
   * @param ctx context
   *
   * Return the success message
   */
  async signup(root: any, args: UserCreateInput, ctx: IContext) {
    try {
      // Transform email address to lowercase.
      args.email = args.email.trim().toLowerCase();

      // Validate the submitted email address
      if (!validateEmail(args.email)) {
        throw Error("The email address is invalid");
      }

      // Check if the submitted email for registering already exists.
      if (await ctx.prisma.user({ email: args.email })) {
        throw Error("Email address already exists.");
      }

      // Check if the submitted password is valid
      if (!validPassword(args.password)) {
        throw Error("Password must be at least 5 characters long.");
      }

      // Hash password before stored in the database.
      const password = await bcrypt.hash(args.password, 10);

      await ctx.prisma.createUser({
        cell: args.cell,
        email: args.email,
        name: args.name,
        password,
        role: {
          set: "PASSANGER"
        }
      });

      return { message: "Registered successfully" };
    } catch (e) {
      throw Error(e.message);
    }
  }
};

export { Mutation };
