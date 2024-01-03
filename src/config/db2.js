import { Sequelize } from "sequelize"

const sequelize = new Sequelize("lama_dev", "root", "secret", {
  host: "localhost",
  dialect: "mysql",
});

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, syncDB };
