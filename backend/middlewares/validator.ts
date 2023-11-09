import { Request, Response, NextFunction } from "express";
import jwt, {
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";

// Define a new interface to extend the Request object
interface AuthRequest extends Request {
  payload?: JwtPayload; // Add 'payload' property of type JwtPayload to Request
}

export function isAuthenticated(
  req: AuthRequest, // Use the extended interface
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, secret) as JwtPayload;
    req.payload = payload; // This line should work with the extended interface
  } catch (err: unknown) {
    res.status(401);

    if (err instanceof TokenExpiredError) {
      throw new Error((err as TokenExpiredError).name);
    } else if (err instanceof JsonWebTokenError) {
      throw new Error((err as JsonWebTokenError).message);
    }

    throw new Error("🚫 Un-Authorized 🚫");
  }

  return next();
}
