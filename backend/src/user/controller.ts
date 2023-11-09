import { Request, Response, NextFunction } from "express";
import service from "./service";

const controller = {
  async getAll(request: Request, response: Response) {
    const data = await service.getAll();
    response.json(data);
  },

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await service.findUserByEmail(request.body.email);
      if (user) {
        response
          .status(409)
          .send({ message: `E-Mail ${request.body.email} already exists` });
      } else {
        await service.create(request.body);
        response.status(201).send({
          status: "success",
          data: request.body.email,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  async getOne(request: Request, response: Response) {
    const user = await service.getOne(request.body.id);
    response.json(user);
  },
};

export default controller;
