import { Sequelize } from "sequelize";

const db = new Sequelize("lama_dev", "root", "secret", {
  host: "localhost",
  dialect: "mysql",
});

export default db;


