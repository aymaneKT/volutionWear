import { connection } from "../config/DataBase.js";

export const addOrder = async (userId) => {
  try {
    const query =
      "INSERT INTO Orders (user_id ,total_amount , status) VALUES (?,?,?)";
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

    const [result] = await connection.query(query, id);

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const query = "DELETE FROM Orders WHERE id = ?";
    await connection.query(query, id);
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

// function to add single product on the order for user
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
