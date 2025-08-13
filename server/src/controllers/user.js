const { default: autoBind } = require("auto-bind");
const { hashPassword } = require("../utils/password");

class UserController {
  #service;
  constructor() {
    this.#service = require("../services/user");
    autoBind(this);
  }
  async create(req, res, next) {
    try {
      const { firstName, lastName, email, bio, password } = req.body;
      const { path: avatar } = req.file || { path: undefined };
      const checkExistEmail = await this.#service.getByEmail(email);
      if (checkExistEmail) {
        return res.status(409).json({
          message: "User with this email already exists.",
        });
      }
      const hash = hashPassword(password);
      const user = await this.#service.create({
        firstName,
        lastName,
        avatar,
        bio,
        email,
        password: hash,
      });
      return res.status(201).json({ message: "User created successfully." });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new UserController();
