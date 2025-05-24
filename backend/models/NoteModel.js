import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Note = db.define('notes', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tittle: { // pastikan nama kolom di DB juga title, bukan tittle
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true
});

export default Note;