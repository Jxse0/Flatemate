import express from "express";
import controller from "./controller";

const app = express.Router();

//app.get("/", authenticateToken, controller.get);
app.get("/", controller.get);

export default app;
