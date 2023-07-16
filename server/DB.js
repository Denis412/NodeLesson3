const { Sequelize } = require("sequelize");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME } = process.env;

console.log(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);

const sequelize = new Sequelize(DB_DBNAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

module.exports = sequelize;
