import express from "express";
import {
  addProductToCart,
  getUserOrders,
  deleteProductFromCart,
  updateQuantity,
  checkoutOrder,
  fetchSellerOrders,
} from "../Controllers/ordersController.js";
import { auth } from "../middleware/auth.js";

export const router = express.Router();
router.post("/order", auth, addProductToCart);
router.get("/orders", auth, getUserOrders);
router.delete("/order/product/:productId", auth, deleteProductFromCart);
router.put("/order/product", auth, updateQuantity);
router.post("/order/checkout", auth, checkoutOrder);
router.get("/sellerOrders", auth, fetchSellerOrders);
