import express from "express";
import encryptPassword from "../helpers/encryptPassword.js";
import { validation, emailFormat } from "../helpers/userValidation.js";
import {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
  getCustomerByEmail,
} from "../repositories/customer-repo.js";

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
    const encryptedPassword = await encryptPassword(req.body.password);
    const newCustomer = await addCustomer(
      req.body.name,
      req.body.email,
      encryptedPassword
    );
    res.status(201).json(newCustomer);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.get("/customers", async (req, res) => {
  const customers = await getAllCustomers();
  res.status(200).json({ customers });
});

router.get("/customers/:id", async (req, res) => {
  const findCustomer = await getCustomerById(req.params.id);
  res.status(200).json({ findCustomer });
});

router.get("/customer-by-email", async (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ message: "Email not provided" });
  }

  const findCustomer = await getCustomerByEmail(req.body.email);
  res.status(200).json({ findCustomer });
});

router.delete("/customers/:id", async (req, res) => {
  await deleteCustomer(req.params.id);
  res.status(200).json({ message: "deleted customer" });
});

router.put("/customers/:id", async (req, res) => {
  const encryptedPassword = await encryptPassword(req.body.password);
  updateCustomer(
    req.params.id,
    req.body.name,
    req.body.email,
    encryptedPassword
  );
  res.status(200).json({ message: "user updated" });
});

export default router;
