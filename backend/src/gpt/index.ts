import express from "express";
import controller from "./controller";
import * as gpt_validator from "../validations/gpt";
import validate from "../middleware/validator";

const app = express.Router();

//app.get("/", authenticateToken, controller.get);
app.post("/", validate(gpt_validator.gpt), controller.retrieveMessage);

export default app;
