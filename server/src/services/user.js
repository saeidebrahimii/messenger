const { default: autoBind } = require("auto-bind");
const userModel = require("../models/user");

class UserService {
  constructor() {
    autoBind(this)
  }
  async getByEmail(email) {
    const user = userModel.findOne({ email });
    return user;
  }
  async getById(id) {
    const user = userModel.findById(id);
    return user;
  }
  async create({ firstName, lastName, email, password, avatar, bio }) {
    const user = userModel.create({
      firstName,
      lastName,
      email,
      password,
      avatar,
      bio,
    });
    return user;
  }
}
module.exports=new UserService();