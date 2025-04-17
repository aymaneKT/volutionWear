import express from "express";
export const router = express.Router();
import {  Register, Login } from "../Controllers/userController.js";
router.post("/register", Register);
router.post("/login", Login);
