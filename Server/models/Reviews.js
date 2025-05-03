import { connection } from "../config/DataBase.js";

export const getReviewsForProduct = async (productId) => {
  try {
    const [rows] = await connection.query(
      "SELECT users.id as UserId ,users.username , users.image ,reviews.rating , reviews.comment,reviews.id as reviewId  ,reviews.created_at  FROM reviews join users on users.id = reviews.user_id WHERE product_id = ?",
      [productId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching reviews for product:", error);
    throw error;
  }
};
export const addReview = async (productId, userId, rating, comment) => {
  try {
    const [result] = await connection.query(
      "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
      [productId, userId, rating, comment]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const deleteReview = async (userId, reviewId) => {
  try {
    const query = "DELETE FROM Reviews WHERE user_id = ? AND id = ?";
    const [result] = await connection.query(query, [userId, reviewId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
export const updateReview = async (userId, reviewId, rating, comment) => {
  try {
    const query = "UPDATE reviews SET rating = ?, comment = ? WHERE user_id = ? AND id = ?";
    const [result] = await connection.query(query, [rating, comment, userId, reviewId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};