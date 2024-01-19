import { Request, Response, NextFunction } from "express";
import { sendMessage } from "../websocket";
import returnUser from "../middleware/returnUser";
import service from "./service";

const controller = {
  async send(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = returnUser(request);
      if (!user_token || !request.body.text) {
        return response
          .status(400)
          .send({ error: "Missing user token or message" });
      }
      const message = await service.send(
        user_token.userid,
        user_token.wgid,
        request.body.text
      );

      sendMessage(request.body.text, request.body.username);
      response.status(201).send({
        status: "success",
        data: message,
      });
    } catch (error) {
      response.status(500).send({ error: "Internal Server Error" });
    }
  },

  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = returnUser(request);
      if (!user_token) {
        return response.status(400).send({ error: "Missing user token" });
      }
      const data = await service.getAll(user_token.wgid);
      response.json(data);
    } catch (error) {
      response.status(500).send({ error: "Internal Server Error" });
    }
  },
};

export default controller;
