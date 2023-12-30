import express from "express";
import controller from "./controller";
import validate from "../validations/validator";
import * as todo_validate from "../validations/todo";
import { authenticateToken } from "../auth/authenticateToken";

const app = express.Router();

//app.get("/", authenticateToken, controller.getOne);
app.post("/", validate(todo_validate.todo_create), controller.create);
app.get("/", authenticateToken, controller.getAll);
app.get("/:todoid", authenticateToken, controller.getOne);

export default app;
