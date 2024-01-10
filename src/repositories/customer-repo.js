import Customer from "../models/customerModel.js";

const addCustomer = async (name, email, password) => {
  const newCustomer = await Customer.create({
    name: name,
    email: email,
    password: password,
  });
  return newCustomer;
};

const getAllCustomers = async () => {
  const customers = await Customer.findAll();
  return customers;
};

const getCustomerById = async (paramsId) => {
  const findCustomer = await Customer.findByPk(paramsId);
  return findCustomer;
};

const getCustomerByEmail = async (email) => {
  const findCustomer = await Customer.findOne({
    where: { email: email },
  });
  return findCustomer;
};

const deleteCustomer = async (id) => {
  await Customer.destroy({ where: { id: id } });
}

const updateCustomer = async (id, name, email, password) => {
  const updatedCustomer = await Customer.update(
    { name: name, email: email, password: password },
    {
      where: {
        id: id,
      },
    }
  );
};

export {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
  getCustomerByEmail,
};
