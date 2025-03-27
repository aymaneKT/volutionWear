import {
  addOrder,
  getOrder,
  deleteOrder,
  getOrders,
} from "../models/orders.js";
import { getUser } from "../models/user.js";
import { deleteItemOrder } from "../models/orderItem.js";
import { getProductForSinglrOrder } from "../models/orders.js";

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
    const productsForOrder = await getProductForSinglrOrder(id);
    const data = {
      order,
      productsForOrder,
    };
    return res.status(200).json({ succes: true, data: data });
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

    await deleteItemOrder(id);
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
