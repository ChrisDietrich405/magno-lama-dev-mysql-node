import express from "express";

import { validation, emailFormat } from "../helpers/userValidation.js";
import {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
} from "../repositories/customer-repo.js";

const router = express.Router();

router.post("/customers", (req, res) => {
  const message = validation(req.body);

  if (message) {
    return res.status(400).json({ message });
  }

  const emailMessage = emailFormat(req.body.email);

  if (emailMessage) {
    return res.status(400).json({ emailMessage });
  }

  addCustomer(req, res);
});

router.get("/customers", (req, res) => {
  getAllCustomers(req, res);
});

router.get("/customers/:id", (req, res) => {
  getCustomerById(req, res);
});

router.delete("/customers/:id", (req, res) => {
  deleteCustomer(req, res);
});

router.put("/customers/:id", (req, res) => {
  updateCustomer(req, res);
});

export default router;
