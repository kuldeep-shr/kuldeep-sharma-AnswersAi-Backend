import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";
import UserModel from "../models/User.js";
const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Question.belongsTo(UserModel, { foreignKey: "userId", as: "author" });

export default Question;
