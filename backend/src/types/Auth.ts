export interface RefreshToken {
  id: string;
  hashedToken: string;
  userId: string;
  revoked: boolean;
}

export interface RefreshTokenData {
  jti: string;
  refreshToken: string;
  userId: string;
}
