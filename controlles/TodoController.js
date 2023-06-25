const Todo = require("../models/todo");
const { Op } = require("sequelize");

class TodoController {
  async create(req, res) {
    try {
      const todo = await Todo.create({
        ...req.body,
        UserId: req.authUser.id,
      });

      return res.status(201).json({ create_todo: todo });
    } catch (e) {}
  }

  async update(req, res) {
    try {
      const todo = await Todo.findByPk(req.params.id);

      return res.status(202).json({ update_todo: todo });
    } catch (e) {}
  }

  async getAll(req, res) {
    try {
      const todos = await Todo.findAll({
        where: {
          UserId: req.authUser.id,
        },
      });

      return res.status(200).json({ data: todos });
    } catch (e) {}
  }

  async getOne(req, res) {
    try {
      const todo = await Todo.findOne({
        where: {
          [Op.and]: [{ UserId: req.authUser.id }, { id: req.params.id }],
        },
      });

      return res.status(200).json({
        get_todo: todo,
      });
    } catch (e) {}
  }
}

module.exports = TodoController;
