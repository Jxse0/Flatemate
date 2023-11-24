import jwt from "jsonwebtoken";

type ywtAuth = {
  token: string;
  refreshToken: string;
};

function generateAccessToken(id: string, username: string) {
  return jwt.sign({ id: id, username: username }, process.env.SECRET || "", {
    expiresIn: "3h",
  });
}

const service = {
  login(id: string, username: string): ywtAuth {
    const token = generateAccessToken(id, username);

    const refreshToken = jwt.sign(
      { id: id, username: username },
      process.env.REFRESH_SECRET || ""
    );
    return { token, refreshToken };
  },
  token(refreshToken: string) {
    try {
      const user_token = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET || ""
      );
      if (user_token) {
        const accessToken = generateAccessToken(
          (<any>user_token).id,
          (<any>user_token).username
        );
        return accessToken;
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default service;
