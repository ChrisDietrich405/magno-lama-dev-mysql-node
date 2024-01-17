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

const deleteBook = async (id) => {
  await Book.destroy({
    where: {
      id,
    },
  });
};

const updateBook = async (name, price, id) => {
  await Book.update(
    { name, price },
    {
      where: {
        id,
      },
    }
  );
};

export { addBook, getAllBooks, getBookById, deleteBook, updateBook };
