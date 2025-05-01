import { addReview } from "../models/Reviews.js";

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
