import { Request, Response, NextFunction } from "express";
import service from "./service";
import userService from "../user/service";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../utils/jwt";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import hashToken from "../utils/hashToken";
import { User } from "@prisma/client";

const controller = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "You must provide an email and a password." });
      }

      const existingUser = await userService.findUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({ error: "Email already in use." });
      }

      const user = await userService.create(req.body);

      const jti = uuidv4();
      const tokens = generateTokens(user, jti);

      await service.create({
        jti,
        refreshToken: tokens.refreshToken,
        userId: user.id,
      });

      res.json({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400);
        throw new Error("You must provide an email and a password.");
      }

      const existingUser = await userService.findUserByEmail(email);

      if (!existingUser) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(existingUser, jti);
      await service.create({
        jti,
        refreshToken,
        userId: existingUser.id,
      });

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  },
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.JWT_REFRESH_SECRET;
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400);
        throw new Error("Missing refresh token.");
      }
      if (!secret) {
        throw new Error("JWT_REFRESH_SECRET is not defined");
      }
      const payload = jwt.verify(refreshToken, secret) as JwtPayload;
      const savedRefreshToken = await service.getOne(payload.jti as string);

      if (!savedRefreshToken || savedRefreshToken.revoked === true) {
        res.status(401);
        throw new Error("Unauthorized");
      }

      const hashedToken = hashToken(refreshToken);
      if (hashedToken !== savedRefreshToken.hashedToken) {
        res.status(401);
        throw new Error("Unauthorized");
      }

      const user = (await userService.getOne(payload.userId)) as User;
      if (!user) {
        res.status(401);
        throw new Error("Unauthorized");
      }

      await service.remove(savedRefreshToken.id);
      const jti = uuidv4();
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        user,
        jti
      );

      const userid = user.id;
      await service.create({
        jti,
        refreshToken: newRefreshToken,
        userId: user.id,
      });

      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      next(err);
    }
  },
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      await service.revoke(userId);
      res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (err) {
      next(err);
    }
  },
};

export default controller;
