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
} from "../models/orders.js";
import { getUser } from "../models/user.js";
import { notifySeller } from "./adminActions.js";
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

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // 2. Carica articoli e calcola totale per ogni ordine
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

    const pendingOrder = await existPendingOrder(userId);
    if (!pendingOrder.exist) {
      return res.status(404).json({ error: "No pending order found" });
    }

    const orderId = pendingOrder.id;
    const items = await getOrderItems(orderId);

    // Notifica ogni venditore
    for (const item of items) {
      const seller = await getUser(item.sellerId);
      if (seller) {
        await notifySeller(
          seller.id,
          "New Order Notification",
          `You have received a new order for the product "${item.name}" (ID: ${item.product_id})`,
          orderId
        );
      }
    }

    // Aggiorna lo stato dell'ordine
    await updateOrderStatus(orderId, "completed");

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
