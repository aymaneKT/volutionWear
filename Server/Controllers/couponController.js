import {
  addcoupon,
  getCoupon,
  deletecoupon,
  getCouponsForUser,
  editCoupon,
} from "../models/coupon.js";
import { getUser } from "../models/user.js";

export const addCoupon = async (req, res) => {
  try {
    const user_id = req.user.id;

    const { code, discount_percentage, expiration_date } = req.body;

    const IdCoupon = await addcoupon(
      code,
      discount_percentage,
      expiration_date,
      user_id
    );

    const addedCoupon = await getCoupon(IdCoupon);

    return res.status(201).json({
      success: true,
      data: addedCoupon,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const user = await getUser(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const coupon = await getCoupon(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    await deletecoupon(id, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getCouponsForUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const coupons = await getCouponsForUser(id);

    if (!coupons || coupons.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No coupons found for the user",
      });
    }

    return res.status(200).json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const editCouponController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id, code, discount_percentage, expiration_date } = req.body;

    const coupon = await getCoupon(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    await editCoupon(
      id,
      code,
      discount_percentage,
      expiration_date,
      userId
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
