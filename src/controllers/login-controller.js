import { getCustomerByEmail } from "../repositories/customer-repo.js";
import { emailFormat } from "../helpers/userValidation.js";
import encryptPassword from "../helpers/encryptPassword.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const loginUserController = async (req, res) => {
  const message = emailFormat(req.body.email);

  if (message) {
    res.status(400).json({ message });
  }

  const findUser = await getCustomerByEmail(req.body.email);

  if (!findUser) {
    res.status(401).json({ message: "User doesn't exist" });
  }

  const checkPassword = await bcrypt.compare(
    req.body.password, // User-provided plaintext password
    findUser.password // Hashed password stored in the database
  );
  
  if (!checkPassword) {
    res.status(401).json({ message: "Invalid credentials" });
  }

  const loggedInUser = {
    token: jwt.sign({ customerId: findUser.id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    }),
  };  

  return res.status(201).json(loggedInUser);
};

export { loginUserController };
