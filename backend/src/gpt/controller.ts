import { Request, Response, NextFunction } from "express";
import service from "./service";

const controller = {
  async get(request: Request, response: Response) {
    const data = await service.get();
    response.json(data);
  },
};

export default controller;
