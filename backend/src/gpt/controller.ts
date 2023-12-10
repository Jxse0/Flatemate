import { Request, Response, NextFunction } from "express";
import service from "./service";

const controller = {
  async get(request: Request, response: Response) {
    const data = await service.get(request.body.message);
    response.json(data);
  },
};

export default controller;
