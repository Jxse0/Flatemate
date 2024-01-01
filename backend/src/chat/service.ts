import { Todo, CreateTodo, TodoNotFoundError } from "../types/Todo";
import db from "../../prisma/db";

const service = {
  async send(todo: CreateTodo, userid: string[], startdate: Date) {
    try {
    } catch (error) {
      throw error;
    }
  },
  async getAll(userid: string) {
    try {
    } catch (e) {
      await db.$disconnect();
      process.exit(1);
    }
  },
};
export default service;
