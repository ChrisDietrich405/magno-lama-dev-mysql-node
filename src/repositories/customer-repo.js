import { connect } from "../data-source/index.js";
import bcrypt from "bcryptjs";
// import Customer from "../models/customerModel.js";

const addCustomer = async (name, email, password, res) => {
  try {
    const q = "INSERT INTO customers (name, email, password) VALUES (?, ?, ?)";

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const values = [name, email, encryptedPassword];

    connect(q, values, res, "Customer Added Successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllCustomers = async (req, res) => {
  res.json("hllo")
  // const customers = await Customer.findAll();
  // res.status(200).json({ customers });
};

const getCustomerById = (req, res) => {
  const idParam = req.params.id;

  const newQuery = `SELECT * FROM customers WHERE id = ${idParam}`;
  connect(newQuery, "", res, "Customer Added Successfully");
};

const deleteCustomer = (req, res) => {
  const idParam = req.params.id;
  const q = `DELETE FROM customers WHERE id = ${idParam}`;

  connect(q, "", res, "Customer Deleted Successfully");
};

const updateCustomer = (req, res) => {
  const idParam = req.params.id;
  const values = [req.body.name, req.body.email, req.body.password, idParam];
  const q = `UPDATE customers
  SET name = ?, email = ?, password = ?
  WHERE id = ?`;

  console.log("VALUES", q);
  connect(q, values, res, "Customer Updated Successfully");
};

export {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
};
