import { Router } from "express";
import express from "express";
import connection from "../config/db.js";
import { validation } from "../helpers/userValidation.js";

const router = express.Router();

router.post("/books", (req, res) => {
  const message = validation(req.body);

  if (message) {
    return res.status(400).json({ message });
  }

  const q = "INSERT INTO books (name, cover) VALUES (?, ?)";
  const values = [req.body.name, req.body.cover];


});

export default router;
