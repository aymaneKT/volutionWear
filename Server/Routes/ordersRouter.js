import express from "express";
import {
  addProductToCart,
  getUserOrders,
  deleteProductFromCart,
} from "../Controllers/ordersController.js";
import { auth } from "../middleware/auth.js";

export const router = express.Router();
router.post("/order", auth, addProductToCart);
router.get("/orders", auth, getUserOrders);
router.delete("/order/product/:productId", auth, deleteProductFromCart);
