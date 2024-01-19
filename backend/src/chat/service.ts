import { Todo, CreateTodo, TodoNotFoundError } from "../types/Todo";
import db from "../../prisma/db";

const service = {
  async send(userid: string, wgid: string, message: string) {
    try {
      let chat = await db.chat.findFirst({
        where: {
          wgid: wgid,
        },
      });

      if (!chat) {
        chat = await db.chat.create({
          data: {
            wgid: wgid,
          },
        });
      }

      const newMessage = await db.message.create({
        data: {
          text: message,
          userid: userid,
          chatid: chat.id,
        },
      });

      return newMessage;
    } catch (error) {
      throw error;
    }
  },
  async getAll(wgid: string) {
    try {
      const chats = await db.chat.findMany({
        where: {
          wgid: wgid,
        },
        include: {
          messages: true,
        },
      });

      if (chats.length === 0) {
        return [];
      }

      return chats.map((chat) => chat.messages);
    } catch (error) {
      throw error;
    }
  },
};
export default service;
