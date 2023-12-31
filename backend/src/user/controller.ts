import { Request, Response, NextFunction } from "express";
import service from "./service";
import returnUser from "../middleware/returnUser";

const controller = {
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
    const user = await service.getOne(user_token.userid);
    response.json(user);
  },
  async add2Wg(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = returnUser(request);
      const user = await service.add2Wg(user_token.userid, request.body.wgid);

      response.status(201).send({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  async removeMember(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = returnUser(request);
      const user = await service.removeMember(user_token.userid);

      response.status(201).send({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = returnUser(request);
      const user = await service.update(user_token.userid, request.body);

      response.status(201).send({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
