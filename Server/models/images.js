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
