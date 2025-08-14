const { default: autoBind } = require("auto-bind");
const { compareHashPassword } = require("../utils/password");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

class AuthController {
  #userService;
  constructor() {
    autoBind(this);
    this.#userService = require("../services/user");
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
      return res.json({
        message: "successfully login.",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AuthController();
