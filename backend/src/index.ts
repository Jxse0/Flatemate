import express from "express";
import userRouter from "./user/index";
import authRouter from "./auth/index";
import todoRouter from "./toDo/index";
import cors from "cors";

const app = express();
app.use(express.json());

// Allow requests from all origins, you can adjust this to fit your specific requirements
app.use(cors());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.listen(3001, () => console.log("Flatmate Backend is ready for operations"));
