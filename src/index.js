// import { Sequelize } from "sequelize";
import express from "express";
import bodyParser from "body-parser";
import connection from "./config/db.js";
import booksRouter from "./routes/books.js";
import customersRouter from "./routes/customers.js";
import loginRouter from "./routes/auth.js";
import ordersRouter from "./routes/orders.js";
import messagesRouter from "./routes/messages.js";
import dotenv from "dotenv";
import { syncDB } from "./config/db2.js";

dotenv.config();

syncDB();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", messagesRouter);
app.use("/", booksRouter);
app.use("/", customersRouter);
app.use("/", loginRouter);
app.use("/", ordersRouter);

app.listen(3000, () => {
  console.log("server running");
});
