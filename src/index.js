import express from "express";
import bodyParser from "body-parser";
import connection from "./config/db.js";
import booksRouter from "./routes/books.js";
import customersRouter from "./routes/customers.js";
import loginRouter from "./routes/auth.js";
import locateBookRouter from "./routes/locate-book.js";
import ordersRouter from "./routes/orders.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const syncDB = () => {
  try {
    connection.connect();
    console.log("synched");
  } catch (error) {
    console.log(error);
  }
};

syncDB();

app.use("/", booksRouter);
app.use("/", customersRouter);
app.use("/", loginRouter);
app.use("/", locateBookRouter);
app.use("/", ordersRouter);

app.listen(3000, () => {
  console.log("server running");
});
