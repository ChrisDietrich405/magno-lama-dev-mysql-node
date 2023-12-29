import express from "express";
import { validation } from "../helpers/userValidation.js";
import { connect } from "../data-source/index.js";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../repositories/book-repo.js";

const router = express.Router();

router.post("/books", (req, res) => {
  const message = validation(req.body);

  if (message) {
    return res.status(400).json({ message });
  }

  addBook(req.body.name, req.body.price, res);
});

router.get("/list-all-books", (req, res) => {
  getAllBooks(res);
});

router.get("/books/:id", (req, res) => {
  getBookById(req, res);
});

router.delete("/books/:id", (req, res) => {
  deleteBook(req.params.id, res);
});

router.put("/books/:id", (req, res) => {
  updateBook(req, res);
});

export default router;
