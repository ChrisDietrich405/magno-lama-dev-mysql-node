import express from "express";

import { connect } from "../data-source/index.js";
import {
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../repositories/book-repo.js";

import {
  addBookController,
  getAllBooksController,
  getBookByIdController,
} from "../controllers/book-controller.js";

const router = express.Router();

router.post("/books", addBookController);

router.get("/list-all-books", getAllBooksController);

router.get("/books/:id", getBookByIdController);

router.delete("/books/:id", (req, res) => {
  deleteBook(req.params.id, res);
});

router.put("/books/:id", (req, res) => {
  updateBook(req, res);
});

export default router;
