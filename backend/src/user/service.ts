import { User, CreateUser, UserNotFoundError } from "../types/User";
import db from "../utils/db";
import bcrypt from "bcrypt";

const service = {
  async getAll(): Promise<User[]> {
    try {
      const users = await db.user.findMany();
      await db.$disconnect();
      return users as User[];
    } catch (e) {
      console.error(e);
      await db.$disconnect();
      process.exit(1);
    }
  },

  async create(user: CreateUser) {
    try {
      user.password = bcrypt.hashSync(user.password, 12);
      const newUser = await db.user.create({
        data: user,
      });
      await db.$disconnect();
      return newUser;
    } catch (e) {
      console.error(e);
      await db.$disconnect();
      process.exit(1);
    }
  },

  async getOne(id: string): Promise<User | UserNotFoundError> {
    try {
      const user = await db.user.findUnique({
        where: { id },
      });

      if (!user) {
        return { message: "User not found" };
      }

      return user;
    } catch (error) {
      console.error(error);
      return { message: "Error retrieving user" };
    }
  },
  async findUserByEmail(email: string) {
    try {
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (e) {
      console.error(e);
      throw new Error("Error finding user by email");
    } finally {
      await db.$disconnect();
    }
  },
};

export default service;
