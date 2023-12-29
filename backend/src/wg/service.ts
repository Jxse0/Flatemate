import { Wg, CreateWg } from "../types/Wg";
import db from "../../prisma/db";
import { User } from "../types/User";

const service = {
  async create(wg: CreateWg) {
    try {
      const newWg = await db.wg.create({
        data: {
          name: wg.name,
          description: wg.description,
          rules: wg.rules,
          Users: {
            connect: [{ id: wg.userid }], // Verbinden eines oder mehrerer User mit der WG
          },
        },
      });

      await db.$disconnect();
      return newWg;
    } catch (e) {
      await db.$disconnect();
      throw e; // Weitergeben des Fehlers
    }
  },
  async getOne(wgid: string): Promise<Wg> {
    try {
      const wgMember = await db.wg.findUnique({
        where: {
          id: wgid,
        },
        include: {
          Users: true, // Lädt alle Benutzer, die zu dieser WG gehören
        },
      });
      await db.$disconnect();
      return wgMember as any;
    } catch (e) {
      await db.$disconnect();
      process.exit(1);
    }
  },
};
export default service;
