const UserController = require("./UserController");
const TodoController = require("./TodoController");

const userController = new UserController();
const todoController = new TodoController();

module.exports = { userController, todoController };
