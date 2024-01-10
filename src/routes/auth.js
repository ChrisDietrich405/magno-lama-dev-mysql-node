import express from "express";
import connection from "../config/db.js";
import { emailFormat } from "../helpers/userValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {

  const message = emailFormat(req.body.email);

  if (message) {
    return res.status(400).json({ message });
  }

  const q = `SELECT * FROM customers WHERE email = '${req.body.email}'`;
  const values = [req.body.email];

  connection.query(q, values, async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data[0].password && req.body.password) {
      const comparedPassword = await bcrypt.compare(
        req.body.password,
        data[0].password
      );
      if (!comparedPassword) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const secretKey = process.env.JWT_SECRET;

        const token = jwt.sign({ id: data[0].id }, secretKey, {
          expiresIn: "2d",
        });

        return res
          .status(200)
          .json({ message: "Logged in successfully", jsonWebToken: token });
      }
    }
  });
});

export default router;
