import express from "express";
import {
  addSingleOrder,
  getSingleOrder,
  deleteSingleOrder,
  getAllOrders,
  addSingleProductToOrder,
} from "../Controllers/ordersController.js";

export const router = express.Router();

router.post("/order", addSingleOrder);
router.get("/order/:id", getSingleOrder);
router.delete("/order/:id", deleteSingleOrder);
router.get("/orders", getAllOrders);
router.post("/addproducttoorder", addSingleProductToOrder);
