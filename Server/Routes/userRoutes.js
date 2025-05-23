import express from "express";
import { auth } from "../middleware/auth.js";
import {
  Register,
  Login,
  UpdateProfile,
  GetUser,
  updatePassword,
} from "../Controllers/userController.js";
import { upload } from "../middleware/multer.js";
export const router = express.Router();

router.post("/register", upload.single("avatar"), Register);
router.post("/login", Login);
router.put("/user", [auth], upload.single("avatar"), UpdateProfile);
router.get("/user/:userId", GetUser);
router.patch("/user/password", [auth], updatePassword);
