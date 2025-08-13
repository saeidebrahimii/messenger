const bcrypt = require("bcrypt");
function hashPassword(password) {
  const hash = bcrypt.hashSync(password, 13);
  return hash;
}
function compareHashPassword(password, hashPassword) {
  const compare = bcrypt.compareSync(password, hashPassword);
  return compare;
}
module.exports = { hashPassword, compareHashPassword };
