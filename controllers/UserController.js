import {
  createUserService,
  findQuestionAskedByUser,
  findUserService,
} from "../services/UserService.js";
import { successResponse, errorResponse } from "../utils/helper.js";
import { signToken, verifyPassword } from "../middlewares/ExternalOperation.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkIfUserExists = await findUserService(email);
    if (checkIfUserExists) {
      return res.status(400).json(errorResponse("user already exists", 400));
    }
    const user = await createUserService({
      name: name,
      email: email,
      password: password,
    });
    const getSignToken = await signToken({ id: user.id, email: user.email });
    const dataToSend = [
      {
        name: name,
        email: email,
        token: getSignToken,
        token_validity: "24hr",
      },
    ];

    return res
      .status(201)
      .json(successResponse(dataToSend, "User created successfully", 201));
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json(errorResponse());
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkIfUserExists = await findUserService(email);
    if (!checkIfUserExists) {
      res
        .status(400)
        .json(errorResponse("please first register with us, then login", 400));
      return null;
    }
    const isPasswordMatch = await verifyPassword(
      password,
      checkIfUserExists.password
    );

    if (isPasswordMatch) {
      const getSignToken = await signToken({
        id: checkIfUserExists.id,
        email: checkIfUserExists.email,
      });
      const dataToSend = [
        {
          id: checkIfUserExists.id,
          name: checkIfUserExists.name,
          email: checkIfUserExists.email,
          token: getSignToken,
          token_validity: "24hr",
        },
      ];
      return res
        .status(200)
        .json(successResponse(dataToSend, "login successfully", 200));
    } else {
      return res.status(400).json(errorResponse("invalid credentials", 400));
    }
  } catch (error) {
    console.error("Error login user:", error);
    res.status(500).json(errorResponse());
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.userId;

    const checkIfUserExists = await findUserService(id);
    if (!checkIfUserExists) {
      return res.status(400).json(errorResponse("invalid user", 400));
    }
    const dataToSend = checkIfUserExists.toJSON();
    const { password, ...userWithoutPassword } = dataToSend;

    return res
      .status(200)
      .json(successResponse(userWithoutPassword, "user details", 200));
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json(errorResponse());
  }
};

const getAllQuestionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const collectingQuestions = await findQuestionAskedByUser(userId);
    if (collectingQuestions.length != 0) {
      return res
        .status(200)
        .json(
          successResponse(collectingQuestions, "questions asked by user", 200)
        );
    } else {
      res
        .status(400)
        .json(
          errorResponse(
            "either user is not exist or user has no questions till now",
            400
          )
        );
    }
  } catch (error) {
    console.error("Error fetching questions asked by user", error);
    res.status(500).json(errorResponse());
  }
};
export { getUser, getAllQuestionsByUser, register, login };
