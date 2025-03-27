import { connection } from "../config/DataBase.js";

export const addOrder = async (userId) => {
  try {
    const query =
      "INSERT INTO Orders (user_id ,total_amount , status) VALUES (? , ? , ?)";
    const [order] = await connection.query(query, [userId, 0, "pending"]);
    return order.insertId;
  } catch (error) {
    throw error;
  }
};

export const getOrder = async (id) => {
  try {
    const query =
      "SELECT orders.id , nome , cognome , total_amount , status , orders.created_at FROM users join orders on users.id = orders.user_id WHERE orders.id = ?";

    const [result] = await connection.query(query, [id]);

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const query = "DELETE FROM Orders WHERE id = ?";
    await connection.query(query, [id]);
    return;
  } catch (error) {
    throw error;
  }
};
export const getOrders = async () => {
  try {
    const query = `
      SELECT orders.id, users.nome, users.cognome, orders.total_amount, orders.status, orders.created_at
      FROM orders
      JOIN users ON orders.user_id = users.id
    `;
    const [orders] = await connection.query(query);
    return orders;
  } catch (error) {
    throw error;
  }
};

export const getPendingOrder = async (userId) => {
  const query =
    "SELECT * FROM orders WHERE user_id = ? AND status = 'pending' LIMIT 1";
  const [result] = await connection.query(query, [userId]);
  return result.length > 0 ? result[0] : null;
};

export const getProductForSinglrOrder = async (orderId) => {
  const query = `SELECT products.id, products.name, products.price, order_items.quantity FROM products JOIN order_items ON products.id = order_items.product_id WHERE order_items.order_id = ?`;
  const [products] = await connection.query(query, [orderId]);
  return products;
};
