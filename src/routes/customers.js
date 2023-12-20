import express from "express";
import bcrypt from "bcryptjs";
import { connect } from "../data-source/index.js";
import { validation, emailFormat } from "../helpers/userValidation.js";

const router = express.Router();

router.post("/customers", async (req, res) => {
  const message = validation(req.body);

  if (message) {
    return res.status(400).json({ message });
  }

  const emailMessage = emailFormat(req.body.email);

  if (emailMessage) {
    return res.status(400).json({ emailMessage });
  }
  
  try {
    const q = "INSERT INTO customers (name, email, password) VALUES (?, ?, ?)";

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    const values = [req.body.name, req.body.email, encryptedPassword];

    connect(q, values, res, "Customer Added Successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.get("/customers", (req, res) => {
  const newQuery = "SELECT * FROM customers";

  connect(newQuery, "", res, "Getting All Customers");
});

router.get("/customers/:id", (req, res) => {
  const idParam = req.params.id;

  const newQuery = `SELECT * FROM customers WHERE id = ${idParam}`;
  connect(newQuery, "", res, "Customer Added Successfully");
});

router.delete("/customers/:id", (req, res) => {
  const idParam = req.params.id;
  const q = `DELETE FROM customers WHERE id = ${idParam}`;

  connect(q, "", res, "Customer Deleted Successfully");
});

router.put("/customers/:id", (req, res) => {
  const idParam = req.params.id;
  const values = [req.body.name, req.body.email, req.body.password, idParam];

  const q = `UPDATE customers
    SET name = ?, email = ?, password = ?
    WHERE id = ?`;

  connect(q, values, res, "Customer Updated Successfully");
});

export default router;
