import express from "express";
import controller from "./controller";
import validate from "../validations/validator";
import * as todo_validate from "../validations/todo";
import { authenticateToken } from "../auth/authenticateToken";

const app = express.Router();

app.post("/", controller.send);

export default app;
