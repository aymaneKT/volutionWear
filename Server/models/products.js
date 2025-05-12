import { connection } from "../config/DataBase.js";

export const addproduct = async (
  name,
  description,
  price,
  stock,
  categoryId
) => {
  try {
    const query =
      "INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)";
    const [product] = await connection.query(query, [
      name,
      description,
      price,
      stock,
      categoryId,
    ]);
    return product.insertId;
  } catch (error) {
    throw error;
  }
};
export const getproducts = async () => {
  try {
    const query =
      "SELECT users.id as sellerId , users.username as username , products.id as ProductId, products.name , products.description , products.price , products.stock , categories.name as category from users JOIN product_listings on users.id = product_listings.seller_id JOIN products on products.id = product_listings.product_id join categories on products.category_id = categories.id ";
    const [rows] = await connection.query(query);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const deleteproduct = async (id) => {
  try {
    const query = "DELETE FROM Products WHERE id = ?";
    await connection.query(query, [id]);
    return;
  } catch (error) {
    throw error;
  }
};

export const editproduct = async (
  id,
  name,
  description,
  price,
  stock,
  category_id
) => {
  try {
    const query = `
    UPDATE products 
    SET name = ?, description = ?, price = ?, stock = ?, category_id = ? 
    WHERE id = ?
  `;
    await connection.query(query, [
      name,
      description,
      price,
      stock,
      category_id,
      id,
    ]);
  } catch (error) {
    throw error;
  }
};

export const getproduct = async (id) => {
  try {
    const query =
      "SELECT products.id , products.name , products.description , products.price , products.stock , categories.name as category from products JOIN categories on products.category_id = categories.id WHERE products.id = ?";
    const [rows] = await connection.query(query, [id]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};
export const productsForUser = async (id) => {
  try {
    const query =
      "SELECT products.id as productId ,products.name , products.description , products.price , products.stock  , products.created_at , categories.name AS category FROM products JOIN categories on categories.id = products.category_id JOIN product_listings on products.id = product_listings.product_id join users on product_listings.seller_id = users.id WHERE users.id = ?";

    const rows = await connection.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};
export const addListingProduct = async (product_id, seller_id) => {
  try {
    const query =
      "INSERT INTO product_listings (product_id , seller_id) VALUES ( ? , ? )";
    await connection.query(query, [product_id, seller_id]);
  } catch (error) {
    throw error;
  }
};
export const deleteListingProduct = async (product_id, seller_id) => {
  try {
    const query =
      "DELETE FROM product_listings WHERE product_id = ? AND seller_id = ?";
    await connection.query(query, [product_id, seller_id]);
  } catch (error) {
    throw error;
  }
};

export const getProductsPaginated = async (limit, offset) => {
  try {
    const query =
      "SELECT users.id as sellerId , users.username as username , products.id as ProductId, products.name , products.description , products.price , products.stock , products.created_at, categories.name as category from users JOIN product_listings on users.id = product_listings.seller_id JOIN products on products.id = product_listings.product_id join categories on products.category_id = categories.id LIMIT ? OFFSET ? ";
    const [rows] = await connection.query(query, [limit, offset]);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const getTotalProducts = async () => {
  try {
    const query = "SELECT COUNT(*) as total FROM products";
    const [rows] = await connection.query(query);
    return rows[0].total;
  } catch (error) {
    throw error;
  }
};
