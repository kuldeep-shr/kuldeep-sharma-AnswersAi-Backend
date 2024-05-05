import { Sequelize } from "sequelize";

// Create a new Sequelize instance
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "answersai.db",
});

export default sequelize;
