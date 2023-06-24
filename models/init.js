const Todo = require("./todo");
const User = require("./User");

User.hasOne(Todo);
Todo.belongsTo(User);

const init = async () => {
  await User.sync({ alter: true });
  await Todo.sync({ alter: true });
};

module.exports = { init, User, Todo };
