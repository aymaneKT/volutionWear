import { getProductById } from "../models/products.js";
import {
  addReview,
  getReview,
  deleteReview,
  editReview,
  getReviews,
} from "../models/reviews.js";
import { getUser } from "../models/user.js";

export const PostReview = async (req, res) => {
  try {
    const reviewInfo = req.body;
    const { product_id, user_id, rating, comment } = reviewInfo;
    const user = await getUser(user_id);
    if (!user) {
      res.status(404).json({ succes: fale, error: "user not found" });
    }
    const product = await getProductById(product_id);
    if (!product) {
      if (!user) {
        return res
          .status(404)
          .json({ succes: fale, error: "Product not found" });
      }
    }

    const idInsertReview = await addReview(
      product_id,
      user_id,
      rating,
      comment
    );
    const postedComment = await getReview(idInsertReview);
    return res.status(200).json({
      succes: true,
      data: postedComment,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllReviews = async (req, res) => {
  const reviews = await getReviews();

  return res.status(200).json({
    succes: true,
    data: reviews,
  });
};

export const getSingleReview = async (req, res) => {
  const id = req.params.id;

  const review = await getReview(id);
  if (!review) {
    return res.status(400).json({
      succes: false,
      error: "review not found",
    });
  }

  return res.status(201).json({
    succes: true,
    data: review,
  });
};

export const deleteSingleReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await getReview(id);
    if (!review)
      return res.status(404).json({
        succes: false,
        error: "review not found",
      });
    await deleteReview(null, id);
    return res.status(200).json({
      succes: true,
    });
  } catch (error) {
    throw error;
  }
};

export const editSingleReview = async (req, res) => {
  try {
    const review = req.body;
    console.log(review);

    const { id, rating, comment } = review;
    const checkReview = await getReview(id);
    if (!checkReview) {
      return res.status(404).json({
        succes: false,
        error: "review not found",
      });
    }
    await editReview(id, rating, comment);
    return res.status(200).json({
      succes: true,
    });
  } catch (error) {
    throw error;
  }
};
