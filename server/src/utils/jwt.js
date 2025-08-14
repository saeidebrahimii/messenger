const jwt = require("jsonwebtoken");
function generateAccessToken(payload) {
  const secretKey = process.env.JWT_SECRET_ACCESS_TOKEN;
  const DEFAULT_EXPIRE_IN = process.env.JWT_EXPIRE_IN_ACCESS_TOKEN || "15m";
  const token = jwt.sign(payload, secretKey, {
    expiresIn: DEFAULT_EXPIRE_IN,
  });
  return token;
}
function generateRefreshToken(payload) {
  const secretKey = process.env.JWT_SECRET_REFRESH_TOKEN;
  const DEFAULT_EXPIRE_IN = process.env.JWT_EXPIRE_IN_REFRESH_TOKEN || "14d";
  const token = jwt.sign(payload, secretKey, { expiresIn: DEFAULT_EXPIRE_IN });
  return token;
}
function verifyAccessToken(token) {
  const secretKey = process.env.JWT_SECRET_ACCESS_TOKEN;
  const verifyToken = jwt.verify(token, secretKey);
  return verifyToken;
}
function verifyRefreshToken(token) {
  const secretKey = process.env.JWT_SECRET_REFRESH_TOKEN;
  const verifyToken = jwt.verify(token, secretKey);
  return verifyToken;
}
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
