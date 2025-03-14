import { connection } from "../config/DataBase.js";

export const addReview = async (product_id, userId, rating, comment) => {
  try {
    const query =
      "INSERT INTO Reviews (product_id , user_id , rating, comment) VALUES (?,?,?,?)";
    const commentId = await connection.query(query, [
      product_id,
      userId,
      rating,
      comment,
    ]);

    return commentId[0].insertId;
  } catch (error) {
    throw error;
  }
};

export const getReview = async (id) => {
  try {
    const query = "SELECT * FROM Reviews WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};
export const deleteReview = async (productId, id) => {
  try {
    let params;
    let query;
    if (productId === null) {
      query = "DELETE FROM Reviews WHERE id = ?";
      params = [id];
    } else {
      query = "DELETE FROM Reviews WHERE product_id =  ?";
      params = [productId];
    }
    await connection.query(query, [params]);
  } catch (error) {
    throw error;
  }
};

export const editReview = async (id, rating, comment) => {
  try {
    const query = "UPDATE Reviews SET rating = ? , comment = ? WHERE id = ?";
    await connection.query(query, [rating, comment, id]);
  } catch (error) {
    throw error;
  }
};

export const getReviews = async () => {
  try {
    const query = "SELECT * FROM Reviews";
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};
