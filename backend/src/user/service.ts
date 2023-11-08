import { User, CreateUser } from "../types/User";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const service = {
  async getAll(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany();
      await prisma.$disconnect();
      return users as User[];
    } catch (e) {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    }
  },

  async create(user: CreateUser) {
    console.log(user);
    const ids = await this.getAll();
    const id = ids.length + 1;
    console.log(id);
    await prisma.user
      .create({
        data: {
          id: id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          paypal: user.paypal,
        },
      })
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  },
};

export default service;
