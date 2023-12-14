import { Router } from "express";
import express from "express";
import connection from "../config/db.js";
import { validation } from "../helpers/userValidation.js";

const router = express.Router();

router.post("/customers", (req, res) => {
  const message = validation(req.body);

  if (message) {
    return res.status(400).json({ message });
  }

  try {
    const q = "INSERT INTO customers (name, password) VALUES (?, ?)";

    const values = [req.body.name, req.body.email, req.body.password];

    connection.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(201).json({ success: "Customer added successfully" });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.get("/customers", (req, res) => {
  connection.query("SELECT * FROM customers", function (err, results) {
    return res.status(200).json({ message: results });
  });
});

export default router;

router.delete("/customers/:id", (req, res) => {
  const idParam = req.params.id;
  const q = `DELETE FROM customers WHERE id = ${idParam}`;

  connection.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(201).json({ success: "Customer deleted successfully" });
  });
});

router.update("/customers/:id", (req, res) => {
  
})
