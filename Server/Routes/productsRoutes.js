import express from "express";
import { auth } from "../middleware/auth.js";

import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductsForAdmin,
  getAllProducts,
} from "../Controllers/productController.js";
export const router = express.Router();

router.post("/product", [auth], addProduct);
router.delete("/product/:id", [auth], deleteProduct);
router.put("/product", [auth], editProduct);
router.get("/products/:userId", getProductsForAdmin);
router.get("/products", getAllProducts);
