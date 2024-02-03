import { getCustomerByEmail } from "../repositories/customer-repo.js";
import { emailFormat } from "../helpers/userValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const loginUserController = async (req, res) => {
  const message = emailFormat(req.body.email);

  if (message) {
    res.status(400).json({ message });
  }

  const findUser = await findUserByEmail(req.body.email, res);

  await checkPasswordFunction(req.body.password, findUser, res);

  const loggedInUser = {
    token: jwt.sign(
      { customerId: findUser.id, customerEmail: findUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    ),
  };

  return res.status(201).json(loggedInUser);
};

const findUserByEmail = async (email, res) => {
  const findUser = await getCustomerByEmail(email);

  if (!findUser) {
    return res.status(401).json({ message: "User doesn't exist" });
  }
  return findUser;
};

const checkPasswordFunction = async (password, findUser, res) => {
  const checkPassword = await bcrypt.compare(password, findUser.password);

  if (!checkPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  return checkPassword;
};

export { loginUserController };
