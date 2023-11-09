import { Request, Response, NextFunction } from "express";
import service from "./service";
import returnUser from "../middleware/returnUser";

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
    const user_token = returnUser(request);
    const user = await service.getOne(user_token.id);
    response.json(user);
  },
};

export default controller;
