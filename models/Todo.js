const path = require("path");
const { sequelize } = require("../DB");
const { DataTypes } = require("sequelize");

const Todo = sequelize.define("todo", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = { Todo };
