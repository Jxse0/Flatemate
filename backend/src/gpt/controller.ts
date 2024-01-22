import { Request, Response, NextFunction } from "express";
import service from "./service";

const controller = {
  async retrieveMessage(request: Request, response: Response) {
    try {
      if (!request.body.message) {
        return response.status(400).send({ error: "Message is required" });
      }

      const data = await service.retrieveMessage(request.body.message);
      response.json(data);
    } catch (error) {
      response.status(500).send({ error: "Internal Server Error" });
    }
  },
};

export default controller;
