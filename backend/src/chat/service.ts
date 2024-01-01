import { Todo, CreateTodo, TodoNotFoundError } from "../types/Todo";
import db from "../../prisma/db";

const service = {
  async send(userId: string, message: string) {
    try {
      const chatMessage = await db.chat.create({
        data: {
          message: message,
          userId: userId,
        },
      });
      return chatMessage;
    } catch (error) {
      console.error("Fehler beim Erstellen der Chat-Nachricht:", error);
      throw error;
    }
  },
};
export default service;
