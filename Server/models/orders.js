import { connection } from "../config/DataBase.js";

export const existPendingOrder = async (userId) => {
  try {
    const query = `SELECT * FROM orders WHERE user_id = ? AND status = 'pending' LIMIT 1`;
    const [rows] = await connection.query(query, [userId]);

    return { exist: rows.length > 0, id: rows.length > 0 ? rows[0].id : null };
  } catch (error) {
    throw new Error("Error checking pending orders: " + error.message);
  }
};

export const createPendingOrder = async (userId) => {
  try {
    const query = `INSERT INTO Orders (user_id, status) VALUES (?, 'pending')`;
    const [result] = await connection.query(query, [userId]);
    return result.insertId;
  } catch (error) {
    throw new Error("Error creating pending order: " + error.message);
  }
};

export const addProductToOrder = async (
  orderId,
  productId,
  quantity,
  price
) => {
  try {
    const query = `INSERT INTO order_items (order_id, product_id, quantity , price) VALUES (?, ?, ? , ?)`;
    const [result] = await connection.query(query, [
      orderId,
      productId,
      quantity,
      price,
    ]);
    return result.insertId;
  } catch (error) {
    throw new Error("Error adding product to order: " + error.message);
  }
};

export const getOrders = async (userId) => {
  try {
    const query = `SELECT * FROM orders WHERE user_id = ?`;
    const [rows] = await connection.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new Error("Error fetching orders: " + error.message);
  }
};

export const getOrderItems = async (orderId) => {
  try {
    const query = `
      SELECT 
      order_items.id AS order_item_id,
      order_items.product_id AS id,
      products.name AS product_name,
      products.price,
      products.stock,
      order_items.quantity,
      (products.price * order_items.quantity) AS total_price,
      categories.name AS category_name,
      product_images.image_url,
      users.id AS sellerId,
      users.username AS seller_username,
      users.nome AS seller_name,
      users.phone_number AS seller_phone,
      orders.created_at AS order_date
      FROM order_items
      INNER JOIN products ON order_items.product_id = products.id
      LEFT JOIN categories ON products.category_id = categories.id
      LEFT JOIN product_images ON product_images.product_id = products.id AND product_images.is_main = 1
      INNER JOIN orders ON order_items.order_id = orders.id
      INNER JOIN product_listings ON products.id = product_listings.product_id
      INNER JOIN users ON product_listings.seller_id = users.id
      WHERE orders.id = ?
    `;

    const [rows] = await connection.query(query, [orderId]);
    return rows;
  } catch (error) {
    console.error("Error in getOrderItems:", error);
    throw new Error("Error fetching order items: " + error.message);
  }
};

export const editOrder = async (orderId, TotalAmout) => {
  try {
    const query = "UPDATE orders SET total_amount = ? WHERE id = ?";
    const [result] = await connection.query(query, [TotalAmout, orderId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error editing order: " + error.message);
  }
};

export const chekcOrderItemExist = async (orderId, productId) => {
  try {
    const query = `SELECT * FROM order_items WHERE order_id = ? AND product_id = ? LIMIT 1`;
    const [rows] = await connection.query(query, [orderId, productId]);
    return rows;
  } catch (error) {
    throw new Error("Error checking order item existence: " + error.message);
  }
};

export const updateOrderItem = async (orderId, productId, quantity) => {
  try {
    const query = `UPDATE order_items SET quantity = ? WHERE order_id = ?  AND   product_id = ?`;
    const [result] = await connection.query(query, [
      quantity,
      orderId,
      productId,
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error updating order item: " + error.message);
  }
};

export const deleteOrderItem = async (orderId, productId) => {
  try {
    const query = `DELETE FROM order_items WHERE order_id = ? AND product_id = ?`;
    const [result] = await connection.query(query, [orderId, productId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error deleting order item: " + error.message);
  }
};
export const updateOrderStatus = async (orderId, status) => {
  try {
    const query = `UPDATE orders SET status = ? WHERE id = ?`;
    const [result] = await connection.query(query, [status, orderId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error updating order status: " + error.message);
  }
};

export const addSellerOrder = async ({
  order_id,
  seller_id,
  order_item_id,
  product_id,
  quantity,
  price,
  buyer_name,
  buyer_email,
  buyer_address,
  buyer_city,
  buyer_cap,
  buyer_country,
  buyer_phone,
}) => {
  const query = `
    INSERT INTO seller_orders
      (order_id, seller_id, order_item_id, product_id, quantity, price,
       buyer_name, buyer_email, buyer_address, buyer_city, buyer_cap, buyer_country, buyer_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await connection.query(query, [
    order_id,
    seller_id,
    order_item_id,
    product_id,
    quantity,
    price,
    buyer_name,
    buyer_email,
    buyer_address,
    buyer_city,
    buyer_cap,
    buyer_country,
    buyer_phone
  ]);

  return result.insertId;
};


export const getSellerOrders = async (sellerId) => {
  try {
    const query = `
      SELECT 
      so.id AS seller_order_id,
      o.id AS order_id,
      o.status,
      o.total_amount,
      o.created_at AS order_created_at,
      oi.product_id,
      oi.quantity,
      oi.price,
      p.name AS product_name,
      p.stock,
      c.name AS category_name,
      pi.image_url,
      so.buyer_name,
      so.buyer_email,
      so.buyer_address,
      so.buyer_city,
      so.buyer_phone,
      so.buyer_cap,
      so.buyer_country
      FROM seller_orders so
      INNER JOIN orders o ON so.order_id = o.id
      INNER JOIN order_items oi ON so.order_item_id = oi.id
      INNER JOIN products p ON oi.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_main = 1
      WHERE so.seller_id = ?
    `;

    const [rows] = await connection.query(query, [sellerId]);
    return rows;
  } catch (error) {
    console.error("Error in getSellerOrders:", error);
    throw new Error("Error fetching seller orders: " + error.message);
  }
};

export const getOrderItemsBySeller = async (orderId, sellerId) => {
  try {
    const query = `
      SELECT 
        oi.product_id AS id,
        p.name AS product_name,
        p.price,
        p.stock,
        oi.quantity,
        (p.price * oi.quantity) AS total_price,
        c.name AS category_name,
        pi.image_url,
        u.id AS sellerId,
        u.username AS seller_username
      FROM order_items oi
      INNER JOIN products p ON oi.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_main = 1
      INNER JOIN orders o ON oi.order_id = o.id
      INNER JOIN product_listings pl ON p.id = pl.product_id
      INNER JOIN users u ON pl.seller_id = u.id
      WHERE o.id = ? AND u.id = ?`;

    const [rows] = await connection.query(query, [orderId, sellerId]);
    return rows;
  } catch (error) {
    console.error("Error in getOrderItemsBySeller:", error);
    throw new Error("Error fetching order items by seller: " + error.message);
  }
};
