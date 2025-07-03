const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("user_management", "root", "Ayush@0402", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
