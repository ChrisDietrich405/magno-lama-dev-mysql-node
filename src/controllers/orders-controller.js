import { addOrder } from "../repositories/orders-repo.js";

const addOrderController = async (req, res) => {
  const { id } = req.user;

  const discount = req.body.discount;
  const price = req.body.price;

  if (discount > price) {
    res.status(401).json({ message: "discount is higher than price" });
  }

  const finalPrice = price - discount;

  const newOrder = await addOrder(
    id,
    req.body.customerId,
    req.body.bookId,
    price,
    discount,
    finalPrice,
    req.body.dateOfOrder
  );
  return res.status(201).json({ newOrder });
};

export { addOrderController };
