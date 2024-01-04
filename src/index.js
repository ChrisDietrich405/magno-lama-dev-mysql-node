// import { Sequelize } from "sequelize";
import express from "express";
import bodyParser from "body-parser";
import db from "./config/db.js";
import booksRouter from "./routes/books.js";
import customersRouter from "./routes/customers.js";
import loginRouter from "./routes/auth.js";
import ordersRouter from "./routes/orders.js";
import messagesRouter from "./routes/messages.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", messagesRouter);
app.use("/", booksRouter);
app.use("/", customersRouter);
app.use("/", loginRouter);
app.use("/", ordersRouter);

async function syncDB() {
  try {
    await db.sync();
    console.log("it worked");
  } catch (error) {
    console.log(error);
  }
}

syncDB();

app.listen(3000, () => {
  console.log("server running");
});
