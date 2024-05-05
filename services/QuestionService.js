import Anthropic from "@anthropic-ai/sdk";
import QuestionModel from "../models/Question.js";

const answerByAI = async (question) => {
  const anthropic = new Anthropic({
    apiKey: process.env.AI_KEY,
  });

  const message = await anthropic.messages.create({
    max_tokens: parseInt(process.env.AI_MAX_TOKEN),
    messages: [{ role: "user", content: question }],
    model: process.env.AI_MODEL,
  });
  if (message.content.length != 0) {
    return [
      {
        answer: message.content,
      },
    ];
  } else {
    return [];
  }
};

const fetchAnswerService = async (args) => {
  try {
    const savingQuestionAskedUser = await QuestionModel.create({
      title: args.title,
      userId: args.userId,
    });
    const dbResponseModeified = savingQuestionAskedUser.toJSON();

    const getAnswer = await answerByAI(args.title);
    return {
      question: dbResponseModeified.title,
      questionId: dbResponseModeified.id,
      answer: getAnswer[0].answer,
      date: dbResponseModeified.createdAt,
    };
  } catch (error) {
    throw error;
  }
};
const getSpecificQuestionService = async (args) => {
  try {
    const getQuestion = await QuestionModel.findOne({ where: { id: args } });
    const dbResponseModeified = getQuestion.toJSON();
    const getAnswer = await answerByAI(dbResponseModeified.title);
    return {
      question: dbResponseModeified.title,
      questionId: dbResponseModeified.id,
      answer: getAnswer[0].answer,
      date: dbResponseModeified.createdAt,
    };
  } catch (error) {}
};

export { fetchAnswerService, getSpecificQuestionService };
