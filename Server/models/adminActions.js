import { connection } from "../config/DataBase.js";

export const notifySeller = async (seller, action, details) => {
  try {
    const query = `INSERT INTO Admin_Actions (admin_id, action, details , isRead) VALUES (?, ?, ? , false)`;
    const [result] = await connection.query(query, [seller, action, details]);
    return result.insertId;
  } catch (error) {
    throw new Error("Error notifying seller: " + error.message);
  }
};

export const getAdminActions = async (sellerId) => {
  try {
    const query = `SELECT * FROM Admin_Actions WHERE admin_id = ? ORDER BY created_at DESC`;
    const [rows] = await connection.query(query, [sellerId]);
    return rows;
  } catch (error) {
    throw new Error("Error fetching admin actions: " + error.message);
  }
};

export const markActionAsRead = async (actionId) => {
  try {
    const query = `UPDATE Admin_Actions SET isRead = true WHERE id = ?`;
    const [result] = await connection.query(query, [actionId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error marking action as read: " + error.message);
  }
};
