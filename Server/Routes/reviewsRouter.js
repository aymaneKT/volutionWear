import express from "express";
import {
  // getSingleReview,
  PostReview,
  deleteSingleReview,
  editSingleReview,
  // getAllReviews,
} from "../Controllers/reviewsController.js";

export const router = express.Router();

router.post("/review", PostReview);
// router.get("/review/:id", getSingleReview);
// router.get("/reviews", getAllReviews);
router.delete("/review/:id", deleteSingleReview);
router.patch("/review", editSingleReview);
