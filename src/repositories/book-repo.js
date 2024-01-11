import { connect } from "../data-source/index.js";
import Book from "../models/bookModel.js";

const addBook = async (name, price) => {
  return await Book.create({ name, price });
};

const getAllBooks = async (res) => {
  const allBooks = await Book.findAll();

  return allBooks;
};

const getBookById = async (id) => {
  const findBook = await Book.findByPk(id);
  return findBook;
};

const deleteBook = (idParam, res) => {
  const q = `DELETE FROM books WHERE id = ${idParam}`;

  connect(q, "", res, "Book deleted successfully");
};

const updateBook = (req, res) => {
  const idParam = req.params.id;
  const values = [req.body.name, req.body.price, idParam];
  const q = `UPDATE books
    SET name = ?, price = ?
    WHERE id = ?`;

  connect(q, values, res, "Book updated");
};

export { addBook, getAllBooks, getBookById, deleteBook, updateBook };
