import { body } from "express-validator";

const gpt = [body("message").notEmpty().isString()];
export { gpt };
