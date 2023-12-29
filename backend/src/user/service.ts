import { User, CreateUser, UserNotFoundError } from "../types/User";
import db from "../../prisma/db";
import bcrypt from "bcrypt";

const service = {
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
  async add2Wg(userid: string, wgid: string) {
    try {
      const newMember = await db.user.update({
        where: {
          id: userid,
        },
        data: {
          wgid: wgid,
        },
      });
      await db.$disconnect();
      return newMember;
    } catch (e) {
      console.error(e);
      await db.$disconnect();
      process.exit(1);
    }
  },
  async removeMember(userid: string) {
    try {
      const updatedUser = await db.user.update({
        where: {
          id: userid,
        },
        data: {
          wgid: null, // Entfernen der WG-Zuweisung für den Benutzer
        },
      });
      await db.$disconnect();
      return updatedUser;
    } catch (e) {
      console.error(e);
      await db.$disconnect();
      process.exit(1);
    }
  },
  async update(userid: string, data: any) {
    try {
      const updatedUser = await db.user.update({
        where: {
          id: userid, // Identifizieren des Benutzers durch seine ID
        },
        data: data, // Die Daten, die aktualisiert werden sollen
      });
      await db.$disconnect();
      return updatedUser;
    } catch (error) {
      // Fehlerbehandlung
      console.error("Fehler beim Aktualisieren des Benutzers:", error);
      await db.$disconnect();
      throw error;
    }
  },
};

export default service;
