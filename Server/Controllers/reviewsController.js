import { getProductById } from "../models/products.js";
import {
  addReview,
  getReview,
  deleteReview,
  editReview,
  // getReviews,
} from "../models/reviews.js";
import { getUser } from "../models/user.js";

export const PostReview = async (req, res) => {
  try {
    const reviewInfo = req.body;
    const { product_id, rating, comment } = reviewInfo;
    const userParam = req.user;
    console.log(userParam);

    const user = await getUser(userParam.id);
    console.log(user);

    if (!user) {
      res.status(404).json({ succes: fale, error: "user not found" });
    }
    const product = await getProductById(product_id);
    if (!product) {
      return res
        .status(404)
        .json({ succes: false, error: "Product not found" });
    }

    const idInsertReview = await addReview(
      product_id,
      userParam.id,
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

// export const getAllReviews = async (req, res) => {
//   const reviews = await getReviews();
//   if (!reviews || reviews.length === 0)
//     return res.status(200).json({
//       succes: true,
//       data: reviews,
//     });
// };

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

    if (review.user_id !== req.user.id) {
      return res.status(403).json({
        succes: false,
        error: "Unauthorized action",
      });
    }
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
    const { id, rating, comment } = review;
    const checkReview = await getReview(id);
    if (!checkReview) {
      return res.status(404).json({
        succes: false,
        error: "review not found",
      });
    }

    // Check if the user is authorized to edit the review
    if (checkReview.user_id !== req.user.id) {
      return res.status(403).json({
        succes: false,
        error: "Unauthorized action",
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
