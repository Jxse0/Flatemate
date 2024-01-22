import { Request, Response, NextFunction } from "express";
import service from "./service";
import returnUser from "../middleware/returnUser";

const controller = {
  async getAll(request: Request, response: Response) {
    try {
      const user_token = returnUser(request);
      if (!user_token) {
        return response.status(400).json({ error: "User token is required" });
      }
      const data = await service.getAll(user_token.userid);
      response.json(data);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const newTodo = {
        title: request.body.title,
        description: request.body.description,
        frequenz: request.body.frequenz,
      };

      const date = new Date(request.body.startdate);
      if (isNaN(date.getTime())) {
        return response.status(400).json({ error: "Invalid start date" });
      }

      const newtodo = await service.create(newTodo, request.body.ids, date);
      response.status(201).send({
        status: "success",
        data: newtodo,
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  },
  async getOne(request: Request, response: Response) {
    try {
      const todoid = request.params.todoid;
      const userTodos = await service.getOne(todoid as string);
      if (!userTodos) {
        return response.status(404).json({ error: "Todo not found" });
      }
      response.json(userTodos);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  async delete(request: Request, response: Response) {
    try {
      const todoid = request.params.todoid;
      await service.delete(todoid as string);
      response.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },
};

export default controller;
