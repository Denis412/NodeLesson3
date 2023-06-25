const UserService = require("../services/UserService");
const { error401 } = require("../utils/errors_templates");

class UserController {
  async registration(req, res) {
    const { data: user, error } = await UserService.registration(req.body);

    if (error) return error401(res, error);

    return res.status(201).json({ user });
  }

  async authorization(req, res) {
    const { data: user, error } = await UserService.login(req.body);

    if (error) return error401(res, error);

    return res.status(201).json({ data: user });
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
