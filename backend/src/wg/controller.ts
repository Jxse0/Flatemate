import { Request, Response, NextFunction } from "express";
import service from "./service";
import returnUser from "../middleware/returnUser";

const controller = {
  async getOne(request: Request, response: Response) {
    try {
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
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  },

  async invite(request: Request, response: Response) {
    try {
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
