import jwt from "jsonwebtoken";

type ywtAuth = {
  token: string;
  refreshToken: string;
};

function generateAccessToken(userid: string, wgid: string) {
  return jwt.sign({ userid: userid, wgid: wgid }, process.env.SECRET || "", {
    expiresIn: "3h",
  });
}

const service = {
  login(userid: string, wgid: string): ywtAuth {
    const token = generateAccessToken(userid, wgid);

    const refreshToken = jwt.sign(
      { userid: userid, wgid: wgid },
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
          (<any>user_token).wgid
        );
        return accessToken;
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default service;
