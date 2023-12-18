import express from "express";
import connection from "../config/db.js";
import { validation } from "../helpers/userValidation.js";
import { connect } from "../data-source/index.js";

const router = express.Router();

router.post("/books", (req, res) => {
  const message = validation(req.body);

  if (message) {
    return res.status(400).json({ message });
  }

  const q = "INSERT INTO books (name, cover) VALUES (?, ?)";
  const values = [req.body.name, req.body.cover];

  connect(q, values, res, "Book added");
});

router.get("/list-all-books", (req, res) => {
  const q = "SELECT * FROM books";

  connect(q, "", res);
});

router.get("/books/:id", (req, res) => {
  const idParam = req.params.id;

  const q = `SELECT * FROM books WHERE id = ${idParam}`;

  connect(q, "", res, "Returned specific book");
});

router.delete("/books/:id", (req, res) => {
  const idParam = req.params.id;
  const q = `DELETE FROM books WHERE id = ${idParam}`;

  connect(q, values, res, "Book deleted successfully");
});

router.put("/books/:id", (req, res) => {
  const idParam = req.params.id;
  const values = [req.body.name, req.body.cover, idParam];
  const q = `UPDATE books
  SET name = ?, cover = ?
  WHERE id = ?`;

  connect(q, values, res, values);
});

export default router;
