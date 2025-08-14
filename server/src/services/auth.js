const { default: autoBind } = require("auto-bind");
const { RefreshToken } = require("../models/refresh-token");

class AuthService {
  constructor() {
    autoBind(this);
  }
  async saveRefreshToken({ userId, token }) {
    const save = await RefreshToken.create({ userId, token });
    return save;
  }
  async getRefreshTokenByToken(token) {
    const refreshToken = await RefreshToken.findOne({ token });
    return refreshToken;
  }
  async deleteRefreshTokenByToken(token) {
    const deleteToken = await RefreshToken.deleteOne({ token });
    return deleteToken;
  }
}
module.exports = new AuthService();
