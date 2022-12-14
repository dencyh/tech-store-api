export default {
  port: process.env.PORT,
  host: process.env.HOST,
  dbUri: process.env.DATABASE_URL,
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY as string
};
