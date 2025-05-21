import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";

import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductsForAdmin,
  getAllProducts,
  getProduct,
  PaginatedListProducts,
  addProductWithImages
} from "../Controllers/productController.js";

export const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("One or more files are not valid images"), false);
  }
};
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});



router.post("/product", [auth],  upload.array("photos", 5), addProductWithImages);
router.delete("/product/:id", [auth], deleteProduct);
router.put("/product", [auth], editProduct);
router.get("/products/:userId", getProductsForAdmin);
router.get("/products", PaginatedListProducts);
router.get("/product/:id", getProduct);
