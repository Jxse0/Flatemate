import { Todo, CreateTodo, TodoNotFoundError } from "../types/Todo";
import db from "../../prisma/db";

const service = {
  async create(todo: CreateTodo, userid: string[], startdate: Date) {
    try {
      let nextTurn = startdate;

      const createdTodo = await db.todo.create({
        data: {
          title: todo.title,
          description: todo.description,
          frequenz: todo.frequenz,
          UserTodo: {
            create: userid.map((userid, index) => {
              const userTodoData = {
                userid: userid,
                nextTurn: nextTurn,
              };

              // Berechnen des nächsten Termins für den folgenden User
              if (index < userid.length - 1) {
                nextTurn = new Date(
                  nextTurn.getTime() +
                    parseInt(todo.frequenz, 10) * 24 * 60 * 60 * 1000
                );
              }

              return userTodoData;
            }),
          },
        },
      });

      return createdTodo;
    } catch (error) {
      console.error("Fehler beim Erstellen von Todo und UserTodos:", error);
      throw error;
    }
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
  async getOne(todoid: string) {
    try {
      if (!todoid) {
        throw new Error("Todo ID ist erforderlich.");
      }
      const todoWithUserTodos = await db.todo.findUnique({
        where: {
          id: todoid, // Stellen Sie sicher, dass todoId die Todo-ID ist
        },
        include: {
          UserTodo: true,
        },
      });

      if (!todoWithUserTodos) {
        throw new Error(`Todo mit ID ${todoid} nicht gefunden.`);
      }

      return todoWithUserTodos.UserTodo;
    } catch (error) {
      console.error("Fehler beim Abrufen der UserTodos:", error);
      throw error;
    }
  },
};
export default service;
