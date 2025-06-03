import {
  addProductToOrder,
  createPendingOrder,
  existPendingOrder,
  getOrders,
  editOrder,
  getOrderItems,
  chekcOrderItemExist,
  updateOrderItem,
  deleteOrderItem,
  updateOrderStatus,
  getSellerOrders,
  getOrderItemsBySeller,
  addSellerOrder,
} from "../models/orders.js";
import { getUser } from "../models/user.js";
import { notifySeller } from "../models/adminActions.js";
import { transporter } from "../middleware/EmailSender.js";
import { editProductStock } from "../models/products.js";
export const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid product ID or quantity" });
    }

    const userId = req.user.id;

    // Verifica se esiste un ordine PENDING per l'utente
    let existOrder = await existPendingOrder(userId);

    let orderId = existOrder.exist
      ? existOrder.id
      : await createPendingOrder(userId);

    // Verifica se il prodotto è già presente nell'ordine
    const existingProdInOrder = await chekcOrderItemExist(orderId, productId);
    if (existingProdInOrder.length > 0) {
      const updatedQuantity =
        Number(existingProdInOrder[0].quantity) + Number(quantity);

      const isUpdated = await updateOrderItem(
        orderId,
        productId,
        updatedQuantity
      );
      if (!isUpdated) {
        return res.status(500).json({
          error: "Failed to update product quantity in order",
        });
      }

      // Recalculate order total after updating item quantity
      const items = await getOrderItems(orderId);
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      await editOrder(orderId, total);

      return res.status(200).json({
        success: true,
        message: "Product quantity updated successfully",
        orderItemId: existingProdInOrder[0].id,
      });
    }

    // Se non esiste, aggiungi il prodotto all'ordine
    const result = await addProductToOrder(orderId, productId, quantity, price);

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      orderItemId: result,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getOrders(userId);

    const orderWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await getOrderItems(order.id);

        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        await editOrder(order.id, total);

        return {
          ...order,
          items,
          total,
        };
      })
    );

    // 4. Risposta
    return res.status(200).json({
      success: true,
      orders: orderWithItems,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    console.log("Deleting product from cart:", productId);

    const userId = req.user.id;

    // Verifica se esiste un ordine PENDING per l'utente
    let existOrder = await existPendingOrder(userId);
    if (!existOrder.exist) {
      return res.status(404).json({ error: "No pending order found" });
    }

    // Elimina il prodotto dall'ordine
    // Ricalcola il totale dell'ordine dopo la rimozione del prodotto
    const items = await getOrderItems(existOrder.id);
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    await editOrder(existOrder.id, total);
    const result = await deleteOrderItem(existOrder.id, productId);
    if (!result) {
      return res
        .status(500)
        .json({ error: "Failed to delete product from cart" });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid product ID or quantity" });
    }

    const userId = req.user.id;

    // Verifica se esiste un ordine PENDING per l'utente
    let existOrder = await existPendingOrder(userId);
    if (!existOrder.exist) {
      return res.status(404).json({ error: "No pending order found" });
    }

    // Aggiorna la quantità del prodotto nell'ordine
    const isUpdated = await updateOrderItem(existOrder.id, productId, quantity);
    if (!isUpdated) {
      return res.status(500).json({
        error: "Failed to update product quantity in order",
      });
    }

    // Recalculate order total after updating item quantity
    const items = await getOrderItems(existOrder.id);
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    await editOrder(existOrder.id, total);

    return res.status(200).json({
      success: true,
      message: "Product quantity updated successfully",
      orderItemId: isUpdated,
    });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const checkoutOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await getUser(userId);
    if (
      !user.address ||
      !user.city ||
      !user.cap ||
      !user.country ||
      !user.phone_number
    ) {
      return res.status(400).json({
        error:
          "Please complete your profile with address and contact information.",
      });
    }

    const pendingOrder = await existPendingOrder(userId);
    if (!pendingOrder.exist) {
      return res.status(404).json({ error: "No pending order found" });
    }

    const orderId = pendingOrder.id;
    const items = await getOrderItems(orderId);

    // Salva per ogni seller i prodotti venduti
    for (const item of items) {
      await addSellerOrder({
        order_id: orderId,
        seller_id: item.sellerId,
        order_item_id: item.order_item_id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        buyer_name: `${user.nome} ${user.cognome}`,
        buyer_email: user.email,
        buyer_address: user.address,
        buyer_city: user.city,
        buyer_cap: user.cap,
        buyer_country: user.country,
        buyer_phone: user.phone_number,
      });
    }

    // Aggiorna lo stock di ogni prodotto
    for (const item of items) {
      await editProductStock(item.id, item.quantity);
    }

    // Notifica ogni venditore
    for (const item of items) {
      const seller = await getUser(item.sellerId);
      if (seller) {
        await notifySeller(
          seller.id,
          "New Order Notification",
          `You have received a new order for the product "${item.product_name} from ${user.username}". Order ID: ${orderId}. Please prepare the item for shipping.`,
          orderId
        );
      }
    }

    // Aggiorna lo stato dell'ordine
    await updateOrderStatus(orderId, "completed");
    const orderTime = new Date().toLocaleString();
    const itemsListHtml = items
      .map(
        (item) => `
      <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${
        item.product_name
      }</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">€${Number(
        item.price
      ).toFixed(2)}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">€${Number(
        item.price * item.quantity
      ).toFixed(2)}</td>
      </tr>
    `
      )
      .join("");

    const itemsListText = items
      .map(
        (item) =>
          `- ${item.product_name} | Qty: ${item.quantity} | Price: €${Number(
            item.price
          ).toFixed(2)} | Subtotal: €${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const orderTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const tax = orderTotal * 0.1;
    const shipping = 15.99;
    const grandTotal = orderTotal + tax + shipping;

    const message = {
      from: "volutionwear@gmail.com",
      to: user.email,
      subject: "Order Confirmation - Volution Wear",
      text: `Dear ${user.username},

    Thank you for your order!

    Order details:
    - Order ID: ${orderId}
    - Date and Time: ${orderTime}
    - Shipping Address: ${user.address}, ${user.city}, ${user.cap}, ${
        user.country
      }

    Items:
    ${itemsListText}

    Subtotal: €${orderTotal.toFixed(2)}
    Tax (10%): €${tax.toFixed(2)}
    Shipping: €${shipping.toFixed(2)}
    Total: €${grandTotal.toFixed(2)}

    You will receive another email when your order is shipped.

    Thank you for shopping with Volution Wear!

    – The VolutionWear Team`,
      html: `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
    <h2>Order Confirmation - Volution Wear</h2>
    <p>Dear <strong>${user.username}</strong>,</p>
    <p>Thank you for your order!</p>
    <h4>Order details:</h4>
    <ul>
      <li><strong>Order ID:</strong> ${orderId}</li>
      <li><strong>Date and Time:</strong> ${orderTime}</li>
      <li><strong>Shipping Address:</strong> ${user.address}, ${user.city}, ${
        user.cap
      }, ${user.country}</li>
    </ul>
    <h4>Items:</h4>
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
      <tr>
      <th style="padding: 8px; border: 1px solid #ddd;">Product</th>
      <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
      <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
      <th style="padding: 8px; border: 1px solid #ddd;">Subtotal</th>
      </tr>
      </thead>
      <tbody>
      ${items
        .map(
          (item) => `
      <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${
        item.product_name
      }</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">€${Number(
        item.price
      ).toFixed(2)}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">€${(
        Number(item.price) * Number(item.quantity)
      ).toFixed(2)}</td>
      </tr>
      `
        )
        .join("")}
      </tbody>
    </table>
    <p><strong>Subtotal: €${orderTotal.toFixed(2)}</strong></p>
    <p><strong>Tax (10%): €${tax.toFixed(2)}</strong></p>
    <p><strong>Shipping: €${shipping.toFixed(2)}</strong></p>
    <p><strong>Total: €${grandTotal.toFixed(2)}</strong></p>
    <p>You will receive another email when your order is shipped.</p>
    <p>Thank you for shopping with Volution Wear!</p>
    <p><strong>The VolutionWear Team</strong></p>
    </body>
    </html>
    `,
    };

    transporter.sendMail(message, (err) => {
      if (err) {
        console.error(err);
      }
    });
    return res.status(200).json({
      success: true,
      message: "Order completed. You will receive a confirmation email.",
      orderId,
    });
  } catch (error) {
    console.error("Errore durante il checkout:", error);
    return res.status(500).json({ error: "Errore durante il checkout" });
  }
};

export const fetchSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const orders = await getSellerOrders(sellerId);

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await getOrderItemsBySeller(order.order_id, sellerId);
        return { ...order, items };
      })
    );

    res.status(200).json({
      success: true,
      orders: ordersWithItems,
    });
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
