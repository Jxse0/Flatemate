import express from "express";
import controller from "./controller";
import validate from "../middleware/validator";
import * as user_validate from "../validations/user";
import { authenticateToken } from "../auth/authenticateToken";

const app = express.Router();

app.post("/", controller.create);
app.get("/", controller.getOne);
app.get("/members", controller.getMembers);
app.post("/newMember", controller.addMember);

export default app;
