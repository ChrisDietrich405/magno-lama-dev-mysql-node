import express from "express";
import { connect } from "../data-source/index.js";

const router = express.Router();

router.post("/order", (req, res) => {
  const customerId = req.body.customerId;
  const bookId = req.body.bookId;

  const q = `INSERT INTO orders (customerName, city, customerId, bookId) VALUES (?,?,?,?)`;

  const values = [req.body.customerName, req.body.city, customerId, bookId];

  connect(q, values, res, "Order made");

  console.log(customerId, bookId);
});

router.get("/list-orders-by-customer/:id", (req, res) => {
  const customerId = req.params.id;

  const q = `SELECT * FROM orders WHERE(customerId) = ${customerId}`;

  connect(q, "", res, "all orders from this specific customer");
});

router.get("/list-orders-by-customer-email/:id", (req, res) => {
  const customerId = req.params.id;

  const q = `SELECT customerName, email
             FROM orders
             INNER JOIN customers
             ON orders.customerId = ${customerId}
  `;

  connect(q, "", res, "listing order by customer email");
});

export default router;
