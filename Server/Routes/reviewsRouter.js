import express from "express";
import {
  // getSingleReview,
  PostReview,
  deleteSingleReview,
  editSingleReview,
  // getAllReviews,
} from "../Controllers/reviewsController.js";
import { auth } from "../middleware/auth.js";

export const router = express.Router();

router.post("/review", auth, PostReview);
// router.get("/review/:id", getSingleReview);
// router.get("/reviews", getAllReviews);
router.delete("/review/:id", [auth], deleteSingleReview);
router.patch("/review", [auth], editSingleReview);
