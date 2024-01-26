import {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerByEmail,
  deleteCustomer,
  updateCustomer,
} from "../repositories/customer-repo.js";
import { validation, emailFormat } from "../helpers/userValidation.js";
import encryptPassword from "../helpers/encryptPassword.js";

const addCustomerController = async (req, res) => {
  const message = validation(req.body);

  if (message) {
    return res.status(400).json({ message });
  }

  if (emailFormatIsIncorrect(req.body.email)) {
    return res.status(400).json({ message: "Email format incorrect" });
  }

  if (await emailAlreadyExists(req.body.email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const encryptedPassword = await encryptPassword(req.body.password);
    const newCustomer = await addCustomer(
      req.body.name,
      req.body.email,
      encryptedPassword
    );
    res.status(201).json(newCustomer);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const emailAlreadyExists = async (email) => {
  const findUser = await getCustomerByEmail(email);

  if (findUser) {
    return true;
  } else {
    return false;
  }
};

const emailFormatIsIncorrect = (email) => {
  return emailFormat(email);
};

const getAllCustomersController = async (req, res) => {
  const customers = await getAllCustomers();
  res.status(200).json({ customers });
};

const getCustomerByIdController = async (req, res) => {
  const findCustomer = await getCustomerById(req.params.id);
  res.status(200).json({ findCustomer });
};

const getCustomerByEmailController = async (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ message: "Email not provided" });
  }

  const findCustomer = await getCustomerByEmail(req.body.email);
  res.status(200).json({ findCustomer });
};

const deleteCustomerController = async (req, res) => {
  await deleteCustomer(req.params.id);
  res.status(200).json({ message: "deleted customer" });
};

const updateCustomerController = async (req, res) => {
  const encryptedPassword = await encryptPassword(req.body.password);
  updateCustomer(
    req.params.id,
    req.body.name,
    req.body.email,
    encryptedPassword
  );
  res.status(200).json({ message: "user updated" });
};

export {
  addCustomerController,
  getAllCustomersController,
  getCustomerByIdController,
  getCustomerByEmailController,
  deleteCustomerController,
  updateCustomerController,
};
