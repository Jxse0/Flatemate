import { Request, Response } from "express";
import service from "./service";

const controller = {
  async getAll(request: Request, response: Response) {
    const data = await service.getAll();
    response.json(data);
  },

  async create(request: Request, response: Response) {
    const newData = await service.create(request.body);
    response.status(201).json(newData);
  },
};

export default controller;
