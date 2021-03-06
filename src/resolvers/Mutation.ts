import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserCreateInput, UserUpdateInput } from "../generated/prisma-client";
import { validateEmail, validPassword } from "../util";

// Defining user update interface
interface IUserUpdate extends UserUpdateInput {
  newPassword?: string;
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
  async signup(root: any, args: UserCreateInput, ctx: any) {
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

      const user = await ctx.prisma.createUser({
        cell: args.cell,
        email: args.email,
        name: args.name,
        password,
        roles: {
          set: "PASSANGER"
        }
      });

      // generate the jwt token for the user
      const token = jwt.sign(
        {
          user: {
            id: user.id
          }
        },
        "ke-taxi"
      );

      // return signed in user token
      return { token };
    } catch (e) {
      throw Error(e.message);
    }
  },

  async signin(root: any, args: { email: string; password: string }, ctx: any) {
    // check if there is a user with the provided email
    const user = await ctx.prisma.user({
      email: args.email
    });

    if (!user) {
      throw new Error(`No such user found for the email ${args.email}`);
    }

    // check if the password is correct
    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) {
      throw new Error("Invalid password");
    }

    // generate the jwt token for the user
    const token = jwt.sign(
      {
        user: {
          id: user.id
        }
      },
      "ke-taxi"
    );

    // return signed in user token
    return { token };
  },

  /**
   * Updates the user information
   *
   * @param root parent
   * @param args arguments
   * @param ctx context
   *
   * Return the success message
   */
  async updateUser(root: any, args: IUserUpdate, ctx: any) {
    // Check if the user is logged in
    if (!ctx.request.user) {
      throw new Error("You must be logged in to update user information.");
    }

    // Logged in user information
    const user = await ctx.prisma.user({ id: ctx.request.user.id });

    // Check if the user password is corrct
    if (user && !(await bcrypt.compare(args.password, user.password))) {
      throw new Error("Please provide a correct user password");
    }

    // An object holding arguments to update
    const userToUpdate: IUserUpdate = {};

    // If user name is to change
    if (args.name) {
      userToUpdate.name = args.name;
    }

    // If user email is to change
    if (user && args.email && args.email !== user.email) {
      // Transform email address to lowercase.
      args.email = args.email.trim().toLowerCase();

      // Check if the submitted email for registering already exists.
      if (await ctx.prisma.user({ email: args.email })) {
        throw new Error("Email address already exists.");
      }

      userToUpdate.email = args.email;
    }

    // If user password is to change
    if (args.newPassword) {
      // Hash password before stored in the database.
      const password = await bcrypt.hash(args.newPassword, 10);

      userToUpdate.password = password;
    }

    // If user contact is to change
    if (args.cell) {
      userToUpdate.cell = args.cell;
    }

    // If user profile image is to change
    if (args.image) {
      userToUpdate.image = args.image;
    }

    return ctx.prisma.updateUser({
      data: userToUpdate,
      where: {
        id: ctx.request.user.id
      }
    });
  }
};

export { Mutation };
