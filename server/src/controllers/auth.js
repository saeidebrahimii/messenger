const { default: autoBind } = require("auto-bind");
const { compareHashPassword } = require("../utils/password");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

class AuthController {
  #userService;
  #authService;
  constructor() {
    autoBind(this);
    this.#userService = require("../services/user");
    this.#authService = require("../services/auth");
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.#userService.getByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "user not found." });
      }
      const comparePassword = compareHashPassword(password, user.password);
      if (!comparePassword) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
      const accessToken = generateAccessToken({ userId: user._id });
      const refreshToken = generateRefreshToken({ userId: user._id });
      await this.#authService.saveRefreshToken({
        userId: user._id,
        token: refreshToken,
      });
      return res.json({
        message: "successfully login.",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const { token } = req.body;
      const findRefreshToken = await this.#authService.getRefreshTokenByToken(
        token
      );
      if (findRefreshToken) {
        const accessToken = generateAccessToken({
          userId: findRefreshToken.userId,
        });
        return res.json({ accessToken });
      }
      return res
        .status(403)
        .json({ message: "Refresh token invalid or revoked" });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { token } = req.body;
      await this.#authService.deleteRefreshTokenByToken(token);
      res.json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AuthController();
