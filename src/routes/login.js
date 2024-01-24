import express from "express";
import connection from "../config/db.js";



import { loginUserController } from "../controllers/login-controller.js";

const router = express.Router();

router.post("/login", loginUserController);

export default router;
