import { body } from "express-validator";

const login = [
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isString(),
];
export { login };
