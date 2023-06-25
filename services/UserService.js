const User = require("../models/User");
const crypto = require("crypto");

const { generateTokens } = require("../utils/token");

class UserService {
  static async registration(data) {
    const result = { data: null, error: null };

    try {
      const password = crypto
        .createHash("sha256")
        .update(data.password)
        .digest("hex");

      const user = await User.create({
        ...data,
        password,
      });

      delete user.password;

      result.data = user;
    } catch (e) {
      result.error = "Internal server error";
    }

    return result;
  }

  static async login(data) {
    const { login, password } = data;
    const result = { data: null, error: null };

    try {
      const user = await User.findOne({
        where: { login },
      });

      if (!user) error = "Unauthorized";

      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      if (user.password !== hashedPassword) error = "Invalid credentials";

      const tokens = generateTokens({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        login: user.login,
      });

      result.data = { ...user.dataValues, ...tokens };
    } catch (e) {
      result.error = "Unauthorized";
    }

    return result;
  }
}

module.exports = UserService;
