import { Request, Response, NextFunction } from "express";
import { sendMessage } from "../websocket";

const controller = {
  async send(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      return await sendMessage(request.body.message);
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
