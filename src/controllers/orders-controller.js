import { addOrder } from "../repositories/orders-repo.js";

const addOrderController = async (req, res) => {
  const { customerId } = req.user;


  const discount = req.body.discount;
  const price = req.body.price;
  const dateOfOrder = new Date();

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
    dateOfOrder
  );
  return res.status(201).json({ newOrder });
};

export { addOrderController };
