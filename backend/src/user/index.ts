import express from "express";
import controller from "./controller";

const app = express.Router();

app.get("", controller.getAll);

app.post("", controller.create);
export default app;
