import { getUser } from "../models/user.js";
import { getPendingOrder, addOrder, getOrder } from "../models/orders.js";
import { addProductToOrder } from "../models/orderItem.js";

export const addSingleProductToOrder = async (req, res) => {
  try {
    const { productId, user, quantity, price } = req.body;
    const existingUser = await getUser(user);
    if (!existingUser) {
      return res.status(404).json({ success: false, error: "user not found" });
    }

    const existingPaddingOrder = await getPendingOrder(user);
    if (!existingPaddingOrder) {
      const newOrder = await addOrder(user);
      console.log(await getOrder(newOrder));
      await addProductToOrder(newOrder, productId, quantity, price);
      return res.status(200).json({ success: true });
    }
    await addProductToOrder(
      existingPaddingOrder.id,
      productId,
      quantity,
      price
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
