import jwt from "jsonwebtoken";
import { User } from "../types/User";

function generateAccessToken(user: User): string {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "5m",
    }
  );
}

function generateRefreshToken(user: User, jti: string): string {
  return jwt.sign(
    { userId: user.id, jti },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "8h",
    }
  );
}

function generateTokens(
  user: User,
  jti: string
): { accessToken: string; refreshToken: string } {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export { generateAccessToken, generateRefreshToken, generateTokens };
