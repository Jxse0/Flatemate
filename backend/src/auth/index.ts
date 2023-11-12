import { Router } from "express";
import authController from "./controller";
import validate from "../middleware/validator";
import * as auth_validator from "../validations/auth";

const authRouter = Router();

authRouter.post("/login", validate(auth_validator.login), authController.login);
authRouter.post("/token", authController.token);

export default authRouter;
