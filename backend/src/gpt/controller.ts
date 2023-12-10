import { Request, Response, NextFunction } from "express";
import service from "./service";

const controller = {
  async retrieveMessage(request: Request, response: Response) {
    const data = await service.retrieveMessage(request.body.message);
    response.json(data);
  },
};

export default controller;
