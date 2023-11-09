import express from "express";
import controller from "./controller";

const app = express.Router();

app.get("", controller.getAll);
app.post("/info", controller.getOne);
export default app;
