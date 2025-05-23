import express from "express";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductsForAdmin,
  getAllProducts,
  getProduct,
  PaginatedListProducts,
} from "../Controllers/productController.js";
export const router = express.Router();

router.post("/product", [auth], upload.array("images", 5), addProduct);
router.delete("/product/:id", [auth], deleteProduct);
router.put("/product", [auth], editProduct);
router.get("/products/:userId", getProductsForAdmin);
router.get("/products", PaginatedListProducts);
router.get("/product/:id", getProduct);
