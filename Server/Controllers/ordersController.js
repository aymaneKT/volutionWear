import {
  addProductToOrder,
  createPendingOrder,
  existPendingOrder,
  getOrders,
  editOrder,
  getOrderItems,
  chekcOrderItemExist,
  updateOrderItem,
} from "../models/orders.js";

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

    if (existingProdInOrder) {
      // Se esiste, aggiorna la quantità
      const updatedQuantity =
        Number(existingProdInOrder[0].quantity) + Number(quantity);

      await updateOrderItem(orderId, productId, updatedQuantity);
      return res.status(200).json({
        success: true,
        message: "Product quantity updated successfully",
        orderItemId: existingProdInOrder.id,
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

    const orderWithItems = await Promise.all(
      orders.map(async (order) => {
        const orderItems = await getOrderItems(order.id);
        return {
          ...order,
          items: orderItems,
        };
      })
    );
    const TotalAmout = orderWithItems.reduce((acc, order) => {
      const orderTotal = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return acc + orderTotal;
    }, 0);
    await editOrder(orderWithItems[0].id, TotalAmout);
    return res.status(200).json({
      success: true,
      orders: orderWithItems,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
