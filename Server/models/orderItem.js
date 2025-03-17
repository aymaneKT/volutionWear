import { connection } from "../config/DataBase.js";

export const addProductToOrder = async (
  orderId,
  productId,
  quantity,
  price
) => {
  try {
    const query =
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
    await connection.query(query, [orderId, productId, quantity, price]);
    return;
  } catch (error) {
    throw error;
  }
};

export const deleteItemOrder = async (orderId) => {
  try {
    const query = "DELETE FROM  order_items WHERE order_id = ?";
    await connection.query(query, [orderId]);
  } catch (error) {
    throw error;
  }
};
