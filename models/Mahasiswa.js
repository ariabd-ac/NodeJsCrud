const Sequelize = require("sequelize");

const db = require("../config/db");

const Mahasiswa = db.define(
  "mahasiswa",
  {
    nim: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    kelas: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Mahasiswa;
