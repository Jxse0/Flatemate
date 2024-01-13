import express from "express";
import userRouter from "./user/index";
import authRouter from "./auth/index";
import todoRouter from "./toDo/index";
import wgRouter from "./wg/index";
import gptRouter from "./gpt/index";
import chatRouter from "./chat/index";
import shoppingListRouter from "./shoppingList/index";
import cors from "cors";
import { initWebSocket } from "./websocket";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/todo", todoRouter);
app.use("/wg", wgRouter);
app.use("/gpt", gptRouter);
app.use("/chat", chatRouter);
app.use("/shoppingList", shoppingListRouter);

app.listen(3001, () => console.log("Flatmate Backend is ready for operations"));

initWebSocket();
