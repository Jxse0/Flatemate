import express from "express";
import controller from "./controller";
import validate from "../validations/validator";
import * as wg_validate from "../validations/wg";
import { authenticateToken } from "../auth/authenticateToken";

const app = express.Router();

app.post("/", validate(wg_validate.wg_create), controller.create);
app.get("/", authenticateToken, controller.getOne);
app.get("/invite", authenticateToken, controller.invite);

export default app;
