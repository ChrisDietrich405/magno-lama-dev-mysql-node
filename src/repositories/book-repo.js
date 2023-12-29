import { connect } from "../data-source/index.js";

const addBook = (name, price, res) => {
  const q = "INSERT INTO books (name, price) VALUES (?, ?)"; 
  const values = [name, price];
  connect(q, values, res, "Book added");
};

const getAllBooks = (res) => {
  const q = "SELECT * FROM books";
  connect(q, "", res);
};

const getBookById = (req, res) => {
  const idParam = req.params.id;
  const q = `SELECT * FROM books WHERE id = ${idParam}`;
  connect(q, "", res, "Returned specific book");
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
