import { Request, Response, NextFunction } from "express";
import service from "./service";

const controller = {
  async getOne(request: Request, response: Response) {
    const data = await service.getOne(request.body.userid);
    response.json(data);
  },
  async getMembers(request: Request, response: Response) {
    const data = await service.getMembers(request.body.userid);
    response.json(data);
  },
  async addMember(request: Request, response: Response) {
    const data = await service.addMember(
      request.body.userid,
      request.body.newMemberId
    );
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
      };

      await service.create(newWg, request.body.userid);
      response.status(201).send({
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
