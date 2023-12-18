import express from "express";
import connection from "../config/db.js";
import { connect } from "../data-source/index.js";

const router = express.Router();

router.post("/locate-book", (req, res) => {
  const firstDayWithBook = new Date();
  const returnDate = new Date(firstDayWithBook);
  returnDate.setDate(firstDayWithBook.getDate() + 3);

  const idCustomer = req.body.id_customer;
  const idBook = req.body.id_book;

  const q = `INSERT INTO customers_books (first_date_with_book, book_return_date, id_customer, id_book) values(?,?,?,?)`;

  const values = [firstDayWithBook, returnDate, idCustomer, idBook];

  connect(q, values, res, "Book Registered Successfully");
});

router.delete(
  "/delete-one-book-from-one-customer/:id_customer/:id_book",
  (req, res) => {
    const id_customer = req.params.id_customer;
    const id_book = req.params.id_book;

    const q = `DELETE FROM customers_books WHERE id_customer = ${id_customer} AND id_book = ${id_book}`;

    connect(q, "", res, "Book Deleted Successfully");
  }
);

router.get("/one-customers-number-of-books/:id_customer", (req, res) => {
  const id_customer = req.params.id_customer;

  const q = `SELECT * FROM customers_books WHERE id_customer = '${id_customer}'`;

  connect(q, res, "All Books For This Customer");
});

export default router;
