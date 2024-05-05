import sequelize from "./Database.js";
import UserModel from "../models/User.js";
import QuestionModel from "../models/Question.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
    console.log("Connection to the database has been closed.");
  }
})();
