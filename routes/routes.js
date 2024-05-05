import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/ExternalOperation.js";
import {
  getUser,
  getAllQuestionsByUser,
  register,
  login,
} from "../controllers/UserController.js";
import {
  questionAskByUser,
  getSpecificQuestion,
} from "../controllers/QController.js";
import {
  registerSchemaValidation,
  loginSchemaValidation,
} from "../validation/User.js";
import { questionSchemaValidation } from "../validation/Question.js";

router.post("/users", registerSchemaValidation, register);
router.post("/auth/login", loginSchemaValidation, login);
router.get("/users/:userId", verifyToken, getUser);

router.post(
  "/questions",
  questionSchemaValidation,
  verifyToken,
  questionAskByUser
);
router.get("/users/:userId/questions", verifyToken, getAllQuestionsByUser);
router.get("/questions/:questionId", verifyToken, getSpecificQuestion);

export default router;
