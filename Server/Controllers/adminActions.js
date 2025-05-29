import { connection } from "../config/DataBase.js";

export const notifySeller = async (seller, action, details) => {
  try {
    const query = `INSERT INTO Admin_Actions (admin_id, action, details) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.query(query, [seller, action, details]);
    return result.insertId;
  } catch (error) {
    throw new Error("Error notifying seller: " + error.message);
  }
};
