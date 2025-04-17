import express from "express";
import multer from "multer";
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage });
import {
  deleteImage,
  setImage,
  updateMainImage,
} from "../Controllers/imagesController.js";
export const router = express.Router();

router.post("/image/:product_id", upload.array("photos", 5), setImage);
router.delete("/image/:image_id", deleteImage);
router.put("/image/:image_id", updateMainImage);
