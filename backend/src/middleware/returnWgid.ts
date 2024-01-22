export default function returnWgid(token: string) {
  if (typeof token === "string") {
    const wgid = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    return wgid;
  }
}
