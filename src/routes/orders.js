import express from "express";
import { connect } from "../data-source/index.js";
import auth from "../middleware/auth.js";
import { addOrderController, listOrdersByCustomerController } from "../controllers/orders-controller.js";

const router = express.Router();

router.post("/order", auth, addOrderController);

router.get("/list-orders-by-customer", auth, listOrdersByCustomerController);

router.get("/list-orders-by-customer-email/", auth, (req, res) => {
  const { id } = req.user;

  const q = `SELECT customerName, email
             FROM orders
             INNER JOIN customers
             ON orders.customerId = customers.id
             WHERE customers.id = ${id}
  `;

  connect(q, "", res, "listing order by customer email");
});

router.get("/list-all-orders-by-each-customer", (req, res) => {
  const q = `SELECT customers.name, books.name, COUNT(customers.id)
  FROM books
  JOIN orders
  ON books.id = orders.bookId
  JOIN customers
  ON customers.id = orders.customerId
  GROUP BY customers.id, books.name`;

  connect(q, "", res, "listing orders by customers");
});

export default router;
