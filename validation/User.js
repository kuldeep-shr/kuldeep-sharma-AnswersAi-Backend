import Joi from "joi";
import { errorResponse } from "../utils/helper.js";

const registerSchema = Joi.object({
  name: Joi.string().required().error(new Error("please enter the name")),
  email: Joi.string()
    .email()
    .required()
    .error(new Error("please enter the valid email")),
  password: Joi.string()
    .min(5)
    .required()
    .error(new Error("please enter the valid password of minimum 5 words")),
});
const registerSchemaValidation = (req, res, next) => {
  const data = req.body;
  const { error } = registerSchema.validate(data);
  if (error) {
    return res.status(422).json(errorResponse(error.message), 422);
  }
  next();
};

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(new Error("please enter the valid email")),
  password: Joi.string()
    .required()
    .error(
      new Error("please enter the valid password of minimum 5 characters")
    ),
});

const loginSchemaValidation = (req, res, next) => {
  const data = req.body;
  const { error } = loginSchema.validate(data);
  if (error) {
    return res.status(422).json(errorResponse(error.message, 422));
  }
  next();
};

export { registerSchemaValidation, loginSchemaValidation };
