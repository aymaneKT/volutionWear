import { connection } from "../config/DataBase.js";

export const addProduct = async (
  name,
  description,
  price,
  stock,
  categoryId,
  image_url
) => {
  try {
    const query =
      "INSERT INTO Products (name , description , price , stock , category_id , image_url) VALUES (?,?,?,?,?,?)";

    const [product] = await connection.query(query, [
      name,
      description,
      price,
      stock,
      categoryId,
      image_url,
    ]);

    return product.insertId;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const query = "SELECT * FROM Products";
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const query = "SELECT * FROM Products WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const query = "DELETE FROM Products WHERE id = ?";
    await connection.query(query, [id]);
    return;
  } catch (error) {
    throw error;
  }
};

export const editProduct = async ({
  id,
  description,
  price,
  stock,
  category_id,
  image_url,
}) => {
  try {
    const query =
      "UPDATE Products SET description = ?, price = ?,stock = ? ,category_id = ? , image_url = ?  WHERE id = ?";
    await connection.query(query, [
      description,
      price,
      stock,
      category_id,
      image_url,
      id,
    ]);
  } catch (error) {
    throw error;
  }
};

export const addProductForUser = async (userId, productId) => {
  try {
    const query =
      "INSERT INTO product_listings (seller_id , product_id) VALUES (?, ?)";
    await connection.query(query, [userId, productId]);
  } catch (error) {
    throw error;
  }
};

export const productsForUser = async (id) => {
  try {
    const query =
      "SELECT users.id , products.id ,products.name , products.description , products.price , products.stock , products.image_url , products.created_at , categories.name FROM products JOIN categories on categories.id = products.category_id JOIN product_listings on products.id = product_listings.product_id join users on product_listings.seller_id = users.id WHERE users.id = ?";

    const rows = await connection.query(query, [id]);
    console.log(rows[0]);
    
    return rows[0];
  } catch (error) {}
};
