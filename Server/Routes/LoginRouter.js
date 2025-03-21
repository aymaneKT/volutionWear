import express from "express";
import { Login } from "../Controllers/LoginController.js";

export const router = express.Router();

router.post("/login", Login);
