import Order from "../models/orderModel.js";
import Customer from "../models/customerModel.js";

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
  return await Order.findAll({ where: { customerId: id } });
};

const listOrdersByCustomerEmail = async (email) => {
  return await Order.findAll({
    include: [
      {
        model: Customer,
        where: { email: email },
        required: true,
      },
    ],
  });
};

const listAllOrdersByEachCustomer = async () => {
  const { customerId, bookId } = await Order.findAndCountAll({
    where: {
      title: {
        [Op.like]: 'foo%'
      }
    },
    offset: 10,
    limit: 2
  });
}

export { addOrder, listOrdersByCustomer, listOrdersByCustomerEmail };
