import express from "express";

import {
  addBookController,
  getAllBooksController,
  getBookByIdController,
  deleteBookController,  
  updateBookController,
} from "../controllers/book-controller.js";

const router = express.Router();

router.post("/books", addBookController);

router.get("/list-all-books", getAllBooksController);

router.get("/books/:id", getBookByIdController);

router.delete("/books/:id", deleteBookController);

router.put("/books/:id", updateBookController);

export default router;
