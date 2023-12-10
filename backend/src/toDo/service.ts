import { Todo, CreateTodo, TodoNotFoundError } from "../types/Todo";
import db from "../../prisma/db";

const service = {
  async create(todo: CreateTodo, userid: string[]) {
    const newTodo = await db.todo.create({
      data: todo,
    });

    userid.forEach(async (user) => {
      const data = { userid: user, todoid: newTodo.id };
      const newUserTodo = await db.userTodo.create({
        data: data,
      });
      return newUserTodo;
    });
  },
  async getAll(userid: string): Promise<Todo[]> {
    try {
      const userTodos = await db.userTodo.findMany({
        where: {
          userid: userid,
        },
      });

      const userTodosIds = userTodos.map((userTodo) => userTodo.todoid);
      const todos = await db.todo.findMany({
        where: {
          id: { in: userTodosIds },
        },
      });

      await db.$disconnect();

      return todos;
    } catch (e) {
      await db.$disconnect();
      process.exit(1);
    }
  },
};
export default service;
