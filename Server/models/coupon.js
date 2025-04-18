import { connection } from "../config/DataBase.js";

export const addcoupon = async (
  code,
  discount_percentage,
  expiration_date,
  user_id
) => {
  try {
    const query =
      "INSERT INTO coupons (code , discount_percentage, expiration_date , user_id) VALUES (? , ? ,  ? , ?)";
    const [result] = await connection.query(query, [
      code,
      discount_percentage,
      expiration_date,
      user_id,
    ]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

export const getCoupon = async (id) => {
  try {
    const query = "SELECT * FROM coupons WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

export const deletecoupon = async (id, user_id) => {
  try {
    const query = "DELETE FROM coupons WHERE id = ? AND user_id = ?";
    await connection.query(query, [id, user_id]);
  } catch (error) {
    throw error;
  }
};

export const getCouponsForUser = async (user_id) => {
  try {
    const query = "SELECT * FROM coupons WHERE user_id = ?";
    const [rows] = await connection.query(query, [user_id]);
    return rows;
  } catch (error) {
    throw error;
  }
};
export const editCoupon = async (
  id,
  code,
  discount_percentage,
  expiration_date,
  user_id
) => {
  try {
    const query = `
      UPDATE coupons 
      SET code = ?, discount_percentage = ?, expiration_date = ? 
      WHERE id = ? AND user_id = ?
    `;
    await connection.query(query, [
      code,
      discount_percentage,
      expiration_date,
      id,
      user_id,
    ]);
   } catch (error) {
    throw error;
  }
};
