import express from "express";
export const router = express.Router();
import { GetUser, Register , Login } from "../Controllers/userController.js";
router.get("/user/:id", GetUser);
router.post("/register", Register);
router.post("/login", Login);
// router.delete("/user/:id", deleteSingleUser);
