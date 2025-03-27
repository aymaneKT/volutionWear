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

// export const updateItemOrder = async (
//   orderId,
//   orderItemId,
//   quantity,
//   product_id
// ) => {
//   try {
//     const query =
//       "UPDATE order_items SET quantity = ? WHERE id = ? AND order_id = ? AND product_id = ?";
//     await connection.query(query, [quantity, orderItemId, orderId, product_id]);

//     return;
//   } catch (error) {
//     throw error;
//   }
// };

export const getOrderItem = async (orderId) => {
  try {
    const query = "SELECT * FROM order_items WHERE id = ?";
    const [rows] = await connection.query(query, [orderId]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};
