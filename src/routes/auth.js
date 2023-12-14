import { Router } from "express";
import express from "express";
import connection from "../config/db.js";
import { emailFormat } from "../helpers/userValidation.js";

const router = express.Router();

router.post("/login", (req, res) => {
  res.json(req.body.email);
  // const message = emailFormat(req.body.email);

  // return res.status(400).json({ message });
  // const q = "INSERT INTO customers (name, password) VALUES (?, ?)";
  // const values = [req.body.email, req.body.password];

  // connection.query(q, values, (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ error: "Internal Server Error" });
  //   }
  //   return res.status(201).json({ success: "Customer added successfully" });
  // });
});

export default router;
