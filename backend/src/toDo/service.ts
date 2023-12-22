import { Todo, CreateTodo, TodoNotFoundError } from "../types/Todo";
import db from "../../prisma/db";

const service = {
  async create(todo: CreateTodo, userid: string[], startdate: Date) {
    const newTodo = await db.todo.create({
      data: todo,
    });
    let nextTurn: Date = startdate;

    userid.forEach(async (user) => {
      const data = { userid: user, todoid: newTodo.id, nextTurn: nextTurn };
      const newUserTodo = await db.userTodo.create({
        data: data,
      });
      nextTurn = new Date(
        nextTurn.getTime() + parseInt(todo.frequenz, 10) * 24 * 60 * 60 * 1000
      );

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

      console.log(await db.userTodo.findMany());

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
