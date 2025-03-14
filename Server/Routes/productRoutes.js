import express from "express";
import {
  addSingleProduct,
  getAllProducts,
  getProduct,
  deleteSingleProduct,
  updateProduct,
  productsForSingleUser,
} from "../Controllers/productsController.js";
export const router = express.Router();

router.post("/product", addSingleProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);
router.delete("/product/:id", deleteSingleProduct);
router.patch("/product", updateProduct);
router.get("/products/:userId", productsForSingleUser);
