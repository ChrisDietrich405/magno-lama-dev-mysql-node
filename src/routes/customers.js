import express from "express";
import bcrypt from "bcryptjs";
import { connect } from "../data-source/index.js";
import { validation, emailFormat, paramPresent } from "../helpers/userValidation.js";

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
  const q = "SELECT * FROM customers";

  connect(q, "", res, "Getting All Customers");
});

router.get("/list-individual-customer/:id", (req, res) => {
  const message = presentParam(req.params.id);

  if (message) {
    return res.status(400).json({ message });
  }
  const idParam = req.params.id;

  // if (!idParam) {
  //   return res.status(400).json("Please add customer id");
  // }

  const q = `SELECT * FROM customers WHERE id = ${idParam}`;
  connect(q, "", res, "Customer Added Successfully");
});

router.delete("/delete-one-customer/:id", (req, res) => {
  const idParam = req.params.id;
  const q = `DELETE FROM customers WHERE id = ${idParam}`;

  connect(q, "", res, "Customer Deleted Successfully");
});

router.put("/update-customer/:id", (req, res) => {
  const idParam = req.params.id;
  const values = [req.body.name, req.body.email, req.body.password, idParam];

  if (!idParam) {
    return res.status(400).json("Please add customer id");
  }

  const q = `UPDATE customers
    SET name = ?, email = ?, password = ?
    WHERE id = ?`;

  connect(q, values, res, "Customer Updated Successfully");
});

export default router;
 


