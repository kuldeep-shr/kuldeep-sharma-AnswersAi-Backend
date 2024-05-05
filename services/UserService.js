import UserModel from "../models/User.js";
import QuestionModel from "../models/Question.js";

const createUserService = async (args) => {
  try {
    const user = await UserModel.create(args);
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserService = async (args) => {
  try {
    let user;
    if (isNaN(args)) {
      // If emailOrId is not a number, assume it's an email
      user = await UserModel.findOne({
        where: { email: args },
      });
    } else {
      // If emailOrId is a number, assume it's an id
      user = await UserModel.findOne({
        where: { id: parseInt(args) },
      });
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const findQuestionAskedByUser = async (args) => {
  try {
    const questions = await QuestionModel.findAll({
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["password", "email", "createdAt", "updatedAt"],
          },
          where: { id: args },
        },
      ],
      attributes: { exclude: ["updatedAt", "userId"] },
    });
    if (questions.length != 0) {
      const dbQueryModified = questions.map((d) => {
        return {
          questionId: d.id,
          question: d.title,
          date: d.createdAt,
          user: d.author.dataValues,
        };
      });
      return dbQueryModified;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

export { createUserService, findUserService, findQuestionAskedByUser };
