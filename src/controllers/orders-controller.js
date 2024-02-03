import {
  addOrder,
  listOrdersByCustomer,
  listOrdersByCustomerEmail,
} from "../repositories/orders-repo.js";

const addOrderController = async (req, res) => {
  const { customerId } = req.user;

  const discount = req.body.discount;
  const price = req.body.price;
  const dateOfOrder = new Date();
  const formattedDate = dateOfOrder.toISOString().split("T")[0];

  if (discount > price) {
    res.status(401).json({ message: "discount is higher than price" });
  }

  const finalPrice = price - discount;
  const newOrder = await addOrder(
    customerId,
    req.body.bookId,
    price,
    discount,
    finalPrice,
    formattedDate
  );
  return res.status(201).json({ newOrder });
};

const listOrdersByCustomerController = async (req, res) => {
  const { customerId } = req.user;
  const ordersFound = await listOrdersByCustomer(customerId);
  return res.status(200).json({ ordersFound });
};

const listOrdersByCustomerEmailController = async (req, res) => {
  const { customerEmail } = req.user;
  const ordersFound = await listOrdersByCustomerEmail(customerEmail);
  return res.status(200).json({ ordersFound });
};

const listAllOrdersByEachCustomerController = async (req, res) => {
  
};

export {
  addOrderController,
  listOrdersByCustomerController,
  listOrdersByCustomerEmailController,
};
