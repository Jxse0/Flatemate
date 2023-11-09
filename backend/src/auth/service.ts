import { RefreshToken, RefreshTokenData } from "../types/Auth";
import db from "../utils/db";
import hashToken from "../utils/hashToken";

const service = {
  async create({
    jti,
    refreshToken,
    userId,
  }: RefreshTokenData): Promise<RefreshToken> {
    try {
      const createdToken = await db.refreshToken.create({
        data: {
          id: jti,
          hashedToken: hashToken(refreshToken),
          userId,
          revoked: false,
        },
      });

      await db.$disconnect();
      return createdToken;
    } catch (e) {
      console.error(e);
      await db.$disconnect();
      throw new Error("Error creating token");
    }
  },

  // used to check if the token sent by the client is in the database.
  async getOne(id: string): Promise<RefreshToken | null> {
    return await db.refreshToken.findUnique({
      where: {
        id,
      },
    });
  },

  async remove(id: string): Promise<RefreshToken> {
    return await db.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true,
      },
    });
  },

  async revoke(userId: string): Promise<RefreshToken[]> {
    await db.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        revoked: true,
      },
    });

    const updatedTokens = await db.refreshToken.findMany({
      where: {
        userId,
      },
    });

    return updatedTokens;
  },
};

export default service;
