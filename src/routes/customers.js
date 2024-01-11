import express from "express";

import {
  addCustomerController,
  getAllCustomersController,
  getCustomerByIdController,
  getCustomerByEmailController,
  deleteCustomerController,
  updateCustomerController
} from "../controllers/customer-controller.js";

const router = express.Router();

router.post("/customers", addCustomerController);

router.get("/customers", getAllCustomersController);

router.get("/customers/:id", getCustomerByIdController);

router.get("/customer-by-email", getCustomerByEmailController);

router.delete("/customers/:id", deleteCustomerController);

router.put("/customers/:id", updateCustomerController);

export default router;
