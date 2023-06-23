const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todos_schema", "root", "Raskat_561", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };
