import { Request, Response, NextFunction } from "express";
import service from "./service";
import returnUser from "../middleware/returnUser";

const controller = {
  async getAll(request: Request, response: Response) {
    const user_token = returnUser(request);
    const data = await service.getAll(user_token.userid);
    response.json(data);
  },
  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newTodo = {
        title: request.body.title,
        description: request.body.description,
        frequenz: request.body.frequenz,
      };
      const date = new Date(request.body.startdate);
      const newtodo = await service.create(newTodo, request.body.ids, date);
      response.status(201).send({
        status: "success",
        data: newtodo,
      });
    } catch (error) {
      next(error);
    }
  },
  async getOne(request: Request, response: Response) {
    const todoid = request.params.todoid;
    const userTodos = await service.getOne(todoid as string);
    response.json(userTodos);
  },
  async delete(request: Request, response: Response) {
    const todoid = request.params.todoid;
    const deleteTodo = await service.delete(todoid as string);
    response.json(deleteTodo);
  },
};

export default controller;
