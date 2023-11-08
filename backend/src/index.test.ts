import request from "supertest";
import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app: Express = express();
app.use(express.json());

// Your endpoints (the code you've provided) would go here

describe("User API", () => {
  it("GET /user should return all user", async () => {
    const res = await request(app).get("/user");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(prisma.user.findMany());
  });
});
