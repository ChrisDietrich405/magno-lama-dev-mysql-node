import Order from "../models/orderModel.js";

const addOrder = async (
  customerId,
  bookId,
  price,
  discount,
  final_price,
  dateOfOrder
) => {
  return await Order.create({
    customerId,
    bookId,
    price,
    discount,
    final_price,
    dateOfOrder,
  });
};

const listOrdersByCustomer = async (id) => {
 
  const findCustomer = await Order.findOne({ where: id });
  console.log("FindCustomer", findCustomer);
};

export { addOrder, listOrdersByCustomer };
