import { connection } from "../config/DataBase.js";

export const existPendingOrder = async (userId) => {
  try {
    const query = `SELECT * FROM orders WHERE user_id = ? AND status = 'pending' LIMIT 1`;
    const [rows] = await connection.query(query, [userId]);

    return { exist: rows.length > 0, id: rows[0].id };
  } catch (error) {
    throw new Error("Error checking pending orders: " + error.message);
  }
};

export const createPendingOrder = async (userId) => {
  try {
    const query = `INSERT INTO Orders (user_id, status) VALUES (?, 'pending')`;
    const [result] = await connection.query(query, [userId]);
    return result.insertId;
  } catch (error) {
    throw new Error("Error creating pending order: " + error.message);
  }
};

export const addProductToOrder = async (
  orderId,
  productId,
  quantity,
  price
) => {
  try {
    const query = `INSERT INTO order_items (order_id, product_id, quantity , price) VALUES (?, ?, ? , ?)`;
    const [result] = await connection.query(query, [
      orderId,
      productId,
      quantity,
      price,
    ]);
    return result.insertId;
  } catch (error) {
    throw new Error("Error adding product to order: " + error.message);
  }
};

export const getOrders = async (userId) => {
  try {
    const query = `SELECT * FROM orders WHERE user_id = ?`;
    const [rows] = await connection.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new Error("Error fetching orders: " + error.message);
  }
};

export const getOrderItems = async (orderId) => {
  try {
    const query =
      "SELECT orders.id, products.name AS product_name, products.price, categories.name AS category_name, order_items.quantity, product_images.image_url FROM products JOIN categories ON products.category_id = categories.id JOIN order_items ON order_items.product_id = products.id JOIN product_images ON product_images.product_id = products.id JOIN orders ON orders.id = order_items.order_id WHERE product_images.is_main = 1 AND orders.id = ?";
    const [rows] = await connection.query(query, [orderId]);
    return rows;
  } catch (error) {
    throw new Error("Error fetching order items: " + error.message);
  }
};
export const editOrder = async (orderId, TotalAmout) => {
  try {
    const query = "UPDATE orders SET total_amount = ? WHERE id = ?";
    const [result] = await connection.query(query, [TotalAmout, orderId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error editing order: " + error.message);
  }
};

export const chekcOrderItemExist = async (orderId, productId) => {
  try {
    const query = `SELECT * FROM order_items WHERE order_id = ? AND product_id = ? LIMIT 1`;
    const [rows] = await connection.query(query, [orderId, productId]);
    return rows;
  } catch (error) {
    throw new Error("Error checking order item existence: " + error.message);
  }
};

export const updateOrderItem = async (orderId, productId, quantity) => {
  try {
    const query = `UPDATE order_items SET quantity = ? WHERE order_id = ?  AND   product_id = ?`;
    const [result] = await connection.query(query, [
      quantity,
      orderId,
      productId,
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error updating order item: " + error.message);
  }
};
