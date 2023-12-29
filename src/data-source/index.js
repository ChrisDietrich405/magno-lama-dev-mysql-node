import connection from "../config/db.js";   

export const connect = (q, values, res) => {
  return connection.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json({ data });
  });
};
