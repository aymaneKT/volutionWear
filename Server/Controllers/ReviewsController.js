import { addReview, deleteReview, updateReview } from "../models/Reviews.js";

export const postReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, rating, comment } = req.body;

    if (!productId || !userId || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const savedReview = await addReview(productId, userId, rating, comment);

    res
      .status(201)
      .json({ message: "Review added successfully", review: savedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const DeleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviewId = req.params.id;

    if (!reviewId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const deletedReview = await deleteReview(userId, reviewId);

    if (!deletedReview) {
      return res.status(401).json({ message: " not authorized" });
    }

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reviewId, rating, comment } = req.body;

    if (!reviewId || !userId || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedReview = await updateReview(userId, reviewId, rating, comment);

    if (!updatedReview) {
      return res
        .status(401)
        .json({ message: "Not authorized or review not found" });
    }

    return res
      .status(200)
      .json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
