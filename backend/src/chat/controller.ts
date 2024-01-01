import { Request, Response, NextFunction } from "express";
import { sendMessage } from "../websocket";
import returnUser from "../middleware/returnUser";
import service from "./service";

const controller = {
  async send(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = returnUser(request);
      const message = await service.send(
        user_token.userid,
        request.body.message
      );
      sendMessage(request.body.message);
      response.status(201).send({
        status: "success",
        data: message,
      });
      return message;
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
