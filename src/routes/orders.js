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
             ON orders.customerId = customers.id
             WHERE customers.id = ${customerId}
  `;

  connect(q, "", res, "listing order by customer email");
});



router.get("/list-all-orders-by-each-customer", (req, res) => {
  const q = ` SELECT customers.name, books.name, COUNT(customers.id)
  FROM books
  JOIN orders
  ON books.id = orders.bookId
  JOIN customers
  ON customers.id = orders.customerId
  GROUP BY customers.id, books.name`;

  connect(q, "", res, "listing orders by customers");
});

export default router;
