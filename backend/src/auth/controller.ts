import { Request, Response } from "express";
import userService from "../user/service";
import bcrypt from "bcrypt";
import service from "./service";

const refreshTokens: string[] = [];

const authController = {
  async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;
    const user = await userService.findUserByEmail(email);

    if (!user)
      response.status(400).send({ status: "Error", message: "No User found!" });

    try {
      if (await bcrypt.compare(password, user?.password as string)) {
        const ywtAuth = service.login(user?.id as string, user?.wgid as string);

        if (ywtAuth.token) {
          response.status(200).send(ywtAuth);
        } else {
          response.statusCode = 400;
          response.send("Bad Request");
        }
      } else {
        response.status(403).send({
          status: "error",
          message: "Username or password does not match!",
        });
      }
    } catch {
      response.status(500).send();
    }
  },
  async token(request: Request, response: Response): Promise<void> {
    const refreshToken = request.body.token;

    if (refreshToken == null) {
      response.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
      response.sendStatus(403);
    } else {
      const accessToken = service.token(refreshToken);
      response.json({ token: accessToken });
    }
  },
};

export default authController;
