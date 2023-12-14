import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "lama_dev",
});

export default connection;
