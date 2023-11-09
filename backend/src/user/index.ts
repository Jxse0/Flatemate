import express from "express";
import controller from "./controller";
import validate from "../middleware/valitator";
import * as user_validate from "../validations/user";
import { authenticateToken } from "../auth/authenticateToken";

const app = express.Router();

app.get("/", authenticateToken, controller.getOne);
app.post("/", validate(user_validate.user_create), controller.create);

export default app;
