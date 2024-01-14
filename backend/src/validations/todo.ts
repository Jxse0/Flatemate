import { body } from "express-validator";

const todo_create = [
  body("title").notEmpty().isString(),
  body("description").notEmpty().isString(),
  body("frequenz").notEmpty().isString(),
  body("ids").notEmpty().isArray(),
  body("ids.*").isString(),
  body("startdate").notEmpty().isString(),
];

export { todo_create };
