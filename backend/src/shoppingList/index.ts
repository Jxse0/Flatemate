import express from "express";
import controller from "./controller";
import { authenticateToken } from "../auth/authenticateToken";

const app = express.Router();

app.get("/", authenticateToken, controller.getAll);
app.post("/", authenticateToken, controller.create);
app.get("/:id", authenticateToken, controller.getOne);
app.delete("/:id", authenticateToken, controller.delete);
app.delete("/items/:itemId", authenticateToken, controller.removeItem);
app.put("/items/:itemId", authenticateToken, controller.updateListItem);
app.put("/:id", authenticateToken, controller.updateList);
app.post("/:id/items", controller.addItem);

export default app;
