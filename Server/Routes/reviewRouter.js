import express from "express";
import { DeleteReview, postReview , UpdateReview } from "../Controllers/ReviewsController.js";
import { auth } from "../middleware/auth.js";
export const router = express.Router();

router.post("/review", [auth], postReview);
router.delete("/review/:id", [auth], DeleteReview);
router.put("/review", [auth], UpdateReview);
