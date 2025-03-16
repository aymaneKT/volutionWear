import {
  addOrder,
  getOrder,
  deleteOrder,
  getOrders,
  addProductToOrder,
} from "../models/orders.js";
import { getUser } from "../models/user.js";

export const addSingleOrder = async (req, res) => {
  try {
    const order = req.body;
    const { user_id } = order;
    const user = await getUser(user_id);
    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }
    const idOrderAdded = await addOrder(user_id);
    const addedOrder = await getOrder(idOrderAdded);
    if (!idOrderAdded) {
      return res.status(404).json({ success: false, error: "order not found" });
    }
    res.status(200).json({
      succes: true,
      data: addedOrder,
    });
  } catch (error) {
    throw error;
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    if (!order) {
      return res.status(400).json({
        success: false,
        error: "order not found",
      });
    }
    return res.status(200).json({ succes: true, data: order });
  } catch (error) {
    throw error;
  }
};
export const deleteSingleOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    if (!order) {
      return res.status(404).json({ success: false, error: "order not found" });
    }
    await deleteOrder(id);
    return res
      .status(200)
      .json({ success: true, message: "order deleted successfully" });
  } catch (error) {
    throw error;
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, error: "no orders found" });
    }
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    throw error;
  }
};

export const addSingleProductToOrder = async (req, res) => {
  try {
    const { orderId, productId, user , quantity , price } = req.body;
    const existingUser = await getUser(user);
    if (!existingUser) {
      
      return res.status(404).json({ success: false, error: "user not found" });
    }
    const order = await getOrder(orderId);
    
    if (!order) {
      const newOrder = await addOrder(user);
      await addProductToOrder(newOrder, productId , quantity , price);
    }
    await addProductToOrder(orderId, productId , quantity , price);
    return res.status(200).json({ success: true});
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
