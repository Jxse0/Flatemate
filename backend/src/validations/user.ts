import { body, query } from "express-validator";

const user_update = [
  query("id").notEmpty().isNumeric(),
  body("surname").optional().notEmpty().isString(),
  body("name").optional().notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  body("username").optional().notEmpty().isString(),
  body("password").optional().notEmpty().isString(),
  body("paypal").optional().notEmpty().isString(),
];

const user_create = [
  body("email").notEmpty().isString().isEmail(),
  body("surname").notEmpty().isString(),
  body("name").notEmpty().isString(),
  body("username").notEmpty().isString(),
  body("password").notEmpty().isString(),
  body("paypal").optional().notEmpty().isString(),
];

const user_destroy = [query("id").notEmpty().isNumeric()];

export { user_create, user_update, user_destroy };
