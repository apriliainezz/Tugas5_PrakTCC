import { Sequelize } from "sequelize";

const db = new Sequelize('crud_notes', 'root', '', {
    host: '34.70.74.200',
    dialect: 'mysql',
});

export default db;