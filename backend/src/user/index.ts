import express from "express";
import controller from "./controller";
import validate from "../middleware/valitator";
import * as user_validate from "../validations/user";

const app = express.Router();

app.get("", controller.getAll);
app.post("/info", controller.getOne);
app.post("/", validate(user_validate.user_create), controller.create);

export default app;
