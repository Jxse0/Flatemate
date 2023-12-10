import express from "express";
import controller from "./controller";
import validate from "../middleware/validator";
import * as user_validate from "../validations/user";
import { authenticateToken } from "../auth/authenticateToken";

const app = express.Router();

//app.get("/", authenticateToken, controller.getOne);
app.post("/", controller.create);
app.get("/", controller.getAll);

export default app;
