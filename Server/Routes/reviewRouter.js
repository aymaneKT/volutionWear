import express from "express";
import { postReview } from "../Controllers/ReviewsController.js";
import { auth } from "../middleware/auth.js";
export const router = express.Router();

router.post("/review", [auth], postReview);
