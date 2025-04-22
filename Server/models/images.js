import { connection } from "../config/DataBase.js";

export const saveImage = async (product_id, image_url, is_main) => {
  try {
    const query =
      "INSERT INTO product_images ( product_id , image_url , is_main) VALUES ( ? , ? , ?)";
    const [rows] = await connection.query(query, [
      product_id,
      image_url,
      is_main,
    ]);
    return rows.insertId;
  } catch (error) {
    throw error;
  }
};
export const getImages = async (product_id) => {
  try {
    const query =
      "SELECT image_id, image_url ,product_id, is_main from product_images WHERE product_id = ?";
    const [rows] = await connection.query(query, [product_id]);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const deleteimage = async (image_id, product_id) => {
  try {
    const query =
      "DELETE FROM product_images WHERE image_id = ? and product_id = ?";
    const result = await connection.query(query, [image_id, product_id]);
    return result[0].affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

export const HowManyImages = async (product_id) => {
  try {
    const query =
      "SELECT COUNT(*) as imageCount FROM product_images WHERE product_id = ?";
    const [rows] = await connection.query(query, [product_id]);

    return rows[0].imageCount;
  } catch (error) {
    throw error;
  }
};
export const getImage = async (image_id) => {
  try {
    const query =
      "SELECT image_id, image_url,product_id, is_main FROM product_images WHERE image_id = ?";
    const [rows] = await connection.query(query, [image_id]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};
export const setMainImage = async (product_id, image_id) => {
  try {
    const resetQuery =
      "UPDATE product_images SET is_main = 0 WHERE product_id = ?";
    await connection.query(resetQuery, [product_id]);

    const setMainQuery =
      "UPDATE product_images SET is_main = 1 WHERE image_id = ?";
    await connection.query(setMainQuery, [image_id]);
  } catch (error) {
    throw error;
  }
};

export const isOwnerImage = async (user_id, product_id) => {
  try {
    const query =
      "SELECT * FROM product_listings WHERE product_id = ? AND seller_id = ?";
    const [result] = await connection.query(query, [product_id, user_id]);

    return result.length > 0;
  } catch (error) {
    throw error;
  }
};
