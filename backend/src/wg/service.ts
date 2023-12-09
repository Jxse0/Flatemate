import { Wg, CreateWg } from "../types/Wg";
import db from "../../prisma/db";
import { User } from "../types/User";

const service = {
  async create(wg: CreateWg, userid: string) {
    try {
      const newWg = await db.wg.create({
        data: wg,
      });

      const getWg = await db.wg.findUnique({ where: { id: newWg.id } });
      if (getWg) {
        const wgId = getWg.id;
        const data = {
          wgid: wgId,
          userid: userid,
          aktive: true,
          role: "Admin",
        };
        const newWgMember = await db.wgMember.create({
          data: data,
        });
        await db.$disconnect();
        return newWgMember;
      }
    } catch (e) {
      await db.$disconnect();
      process.exit(1);
    }
  },

  async getOne(userid: string): Promise<Wg> {
    try {
      const wgMember = await db.wgMember.findMany({
        where: { userid: userid },
      });

      const wg = (await db.wg.findUnique({
        where: { id: wgMember[0].wgid },
      })) as Wg;
      await db.$disconnect();
      return wg;
    } catch (e) {
      await db.$disconnect();
      process.exit(1);
    }
  },
  async addMember(userid: string, newMemberId: string) {
    try {
      const wgMember = await db.wgMember.findMany({
        where: { userid: userid },
      });
      const wg = (await db.wg.findUnique({
        where: { id: wgMember[0].wgid },
      })) as Wg;
      const data = {
        wgid: wg.id,
        userid: newMemberId,
        role: "Future Mate",
      };
      const newWgMember = await db.wgMember.create({
        data: data,
      });

      await db.$disconnect();
      return newWgMember;
    } catch (e) {
      await db.$disconnect();
      process.exit(1);
    }
  },
  async getMembers(userid: string): Promise<User[]> {
    try {
      const wgId = await db.wgMember.findMany({
        where: { userid: userid },
      });

      const members = await db.wgMember.findMany({
        where: { wgid: wgId[0].wgid },
      });

      const userIds = members.map((member) => member.userid);

      const userList = await db.user.findMany({
        where: { id: { in: userIds } },
      });
      await db.$disconnect();
      return userList;
    } catch (e) {
      await db.$disconnect();
      process.exit(1);
    }
  },
};
export default service;
