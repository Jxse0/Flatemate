import express from "express";
import controller from "./controller";

const app = express.Router();

app.post("/register", controller.create);
app.post("/login", controller.login);
app.post("/refreshToken", controller.refreshToken);
app.post("/logout", controller.logout);
export default app;
