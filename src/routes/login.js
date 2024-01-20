import express from "express";
import connection from "../config/db.js";
import { emailFormat } from "../helpers/userValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { loginUserController } from "../controllers/login-controller.js";

const router = express.Router();

router.post("/login", loginUserController);

export default router;
