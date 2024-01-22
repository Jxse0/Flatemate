export interface Todo {
  id: string;
  title: string;
  description: string;
  frequenz: string;
}

export interface UserTodo {
  id: string;
  userid: string;
  todoid: string;
  nextTurn: Date;
}

export interface TodoList {
  title: string;
  description: string;
  frequenz: string;
  users: string[];
}

export interface TodoNotFoundError {
  message: string;
}

export type CreateTodo = Omit<Todo, "id">;
