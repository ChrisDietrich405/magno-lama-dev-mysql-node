import { validation } from "../helpers/userValidation.js";
import {
  addBook,
  getAllBooks,
  getBookById,
  deleteBook,
  updateBook,
} from "../repositories/book-repo.js";

const addBookController = async (req, res) => {
  const message = validation(req.body);
  if (message) {
    return res.status(400).json({ message });
  }

  const newBook = await addBook(req.body.name, req.body.price);
  return res.status(201).json(newBook);
};

const getAllBooksController = async (req, res) => {
  const allBooks = await getAllBooks();
  return res.status(200).json(allBooks);
};

const getBookByIdController = async (req, res) => {
  const foundBook = await getBookById(req.params.id);
  return res.status(200).json(foundBook);
};

const deleteBookController = async (req, res) => {
  await deleteBook(req.params.id);
  return res.status(200).json({ message: "book deleted" });
};

const updateBookController = async (req, res) => {
  await updateBook(req.body.name, req.body.price, req.params.id);
  return res.status(200).json({ message: "book updated" });
};

export {
  addBookController,
  getAllBooksController,
  getBookByIdController,
  deleteBookController,
  updateBookController,
};
