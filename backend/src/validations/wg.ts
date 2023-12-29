import { body } from "express-validator";

const wg_create = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("rules").optional().isString().withMessage("Rules must be a string"),
  body("userid").optional().isString().withMessage("User ID must be a string"),
];

export { wg_create };
