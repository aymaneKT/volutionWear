import express from "express";
import {
  addSingleProduct,
  getAllProducts,
  getProduct,
  deleteSingleProduct,
  updateProduct,
  productsForSingleUser,
} from "../Controllers/productsController.js";
import { auth } from "../middleware/auth.js";
export const router = express.Router();

router.post("/product", [auth], addSingleProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);
router.delete("/product/:id", [auth], deleteSingleProduct);
router.patch("/product", [auth], updateProduct);
router.get("/products/:userId", productsForSingleUser);
