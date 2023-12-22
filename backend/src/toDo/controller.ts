import { Request, Response, NextFunction } from "express";
import service from "./service";

const controller = {
  async getAll(request: Request, response: Response) {
    const data = await service.getAll(request.body.id);
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
      await service.create(newTodo, request.body.ids, date);
      response.status(201).send({
        status: "success",
        data: request.body.email,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
