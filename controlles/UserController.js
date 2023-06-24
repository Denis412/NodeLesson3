const User = require("../models/User");
const crypto = require("crypto");

const { generateTokens } = require("../utils/token");

class UserController {
  async registration(req, res) {
    try {
      const password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");

      const user = await User.create({
        ...req.body,
        password,
      });

      delete user.password;

      return res.status(201).json({
        user,
      });
    } catch (e) {}
  }

  async authorization(req, res) {
    try {
      const { login, password } = req.body;

      const user = await User.findOne({
        where: {
          login,
        },
      });

      if (user) {
        const hashedPassword = crypto
          .createHash("sha256")
          .update(password)
          .digest("hex");

        if (user.password === hashedPassword) {
          const tokens = generateTokens({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            login: user.login,
          });

          return res.json({
            ...user.dataValues,
            ...tokens,
          });
        } else {
          return res.status(401).json({
            error: "Unauthorized",
          });
        }
      } else {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }
    } catch (e) {}
  }

  async getMe(req, res) {
    try {
      console.log(req.authUser);

      return res.json({
        status: "Ok",
      });
    } catch (e) {}
  }
}

module.exports = UserController;
