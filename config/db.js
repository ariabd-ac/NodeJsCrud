const sequelize = require("sequelize");
const db = new sequelize("db_crudnodejs", "tokyo", "123", {
  dialect: "mysql",
});

db.sync({});

module.exports = db;
