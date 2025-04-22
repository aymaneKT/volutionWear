import express from "express";
import multer from "multer";
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("One or more files are not valid images"), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
import {auth} from "../middleware/auth.js";
import {
  deleteImage,
  setImage,
  updateMainImage,
} from "../Controllers/imagesController.js";
export const router = express.Router();

router.post("/image/:product_id", [auth], upload.array("photos", 5), setImage);
router.delete("/image", [auth], deleteImage);
router.put("/image/:image_id", [auth], updateMainImage);
