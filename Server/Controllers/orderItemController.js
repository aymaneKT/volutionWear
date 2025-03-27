import { getPendingOrder, addOrder } from "../models/orders.js";
import {
  addProductToOrder,
  getOrderItem,
  updateItemOrder,
} from "../models/orderItem.js";
import { getProductById } from "../models/products.js";

export const addSingleProductToOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, price } = req.body;
    const ExistingProduct = await getProductById(productId);

    if (!ExistingProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    const existingPaddingOrder = await getPendingOrder(userId);

    if (!existingPaddingOrder) {
      const newOrder = await addOrder(userId);
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
    throw error;
  }
};

// export const updateSingleProductInOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, quantity, orderItemId } = req.body;
//     const existingPaddingOrder = await getPendingOrder(userId);
//     const existingOrderItem = await getOrderItem(orderItemId);
//     if (!existingOrderItem) {
//       return res.status(404).json({
//         success: false,
//         error: "OrderItem not found",
//       });
//     }
//     if (!existingPaddingOrder) {
//       return res.status(404).json({
//         success: false,
//         error: "Order not found",
//       });
//     }

//     await updateItemOrder(
//       existingPaddingOrder.id,
//       orderItemId,
//       quantity,
//       productId
//     );
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     throw error;
//   }
// };
