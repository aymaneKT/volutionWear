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
export const router = express.Router();
import { Register, Login } from "../Controllers/userController.js";
router.post("/register",upload.single("avatar"), Register);
router.post("/login", Login);
