import { Request, Response, NextFunction } from "express";
import service from "./service";
import returnUser from "../middleware/returnUser";

const controller = {
  async getOne(request: Request, response: Response) {
    const user_token = returnUser(request);
    const data = await service.getOne(user_token.wgid);
    response.json(data);
  },

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newWg = {
        name: request.body.name,
        description: request.body.description,
        rules: request.body.rules,
        userid: request.body.userid,
      };

      await service.create(newWg);
      response.status(201).send({
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
