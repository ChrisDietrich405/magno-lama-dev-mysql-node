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

export { addOrder };
