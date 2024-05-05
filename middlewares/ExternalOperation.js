//Here are all the middlewares token sign, verify token, verify password, create hashword
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/helper.js";

const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
};

const signToken = (payload, expiresIn = "24h") => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json(errorResponse("No token provided", 400));
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json(errorResponse("Invalid token", 400));
  }
};

export { verifyPassword, signToken, verifyToken };
