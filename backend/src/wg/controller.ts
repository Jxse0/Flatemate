import { Request, Response, NextFunction } from "express";
import service from "./service";
import returnUser from "../middleware/returnUser";

const controller = {
  async getOne(request: Request, response: Response) {
    const user_token = returnUser(request);
    if (!user_token.wgid) {
      return response
        .status(400)
        .send(
          "The token doesn't contain a wgid, please make sure to login again after creating a wg."
        );
    }
    const data = await service.getOne(user_token.wgid);
    response.json(data);
  },

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user_token = returnUser(request);
      const newWg = {
        name: request.body.name,
        description: request.body.description,
        rules: request.body.rules,
        userid: user_token.userid,
      };

      await service.create(newWg);
      response.status(201).send({
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  },
  async invite(request: Request, response: Response) {
    const user_token = returnUser(request);
    if (!user_token.wgid) {
      return response
        .status(400)
        .send(
          "The token doesn't contain a wgid, please make sure to login again after creating a wg."
        );
    }
    const data = await service.getInviteLink(user_token.wgid);
    response.json(data);
  },
};

export default controller;
