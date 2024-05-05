import Joi from "joi";
import { errorResponse } from "../utils/helper.js";

const questionSchema = Joi.object({
  title: Joi.string().required().error(new Error("please enter the question")),
});

const questionSchemaValidation = (req, res, next) => {
  const data = req.body;
  const { error } = questionSchema.validate(data);
  if (error) {
    return res.status(422).json(errorResponse(error.message, 422));
  }
  next();
};

export { questionSchemaValidation };
