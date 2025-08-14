const { verifyAccessToken } = require("../../utils/jwt");

function authGuard(req, res, next) {
  try {
    const authHeader = req.headers?.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const decode = verifyAccessToken(authHeader);
        req.user = { id: decode.userId };
        next();
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Invalid or expired access token" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Authorization header missing or invalid format" });
    }
  } catch (error) {
    next(error);
  }
}
module.exports = authGuard;
