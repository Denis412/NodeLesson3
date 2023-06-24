const { sequelize } = require("../DB");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
