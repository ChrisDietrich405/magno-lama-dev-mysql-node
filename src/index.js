import express from "express";
import connection from "./config/db.js";
import booksRouter from "./routes/books.js";
import customersRouter from "./routes/customers.js";
import loginRouter from "./routes/auth.js";

const app = express();

app.use(express.json());

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

app.listen(3000, () => {
  console.log("server running");
});
