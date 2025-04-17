import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { setImage } from "../Controllers/imagesController.js";
export const router = express.Router();

router.post("/image/:product_id", upload.array("photos", 5), setImage);
