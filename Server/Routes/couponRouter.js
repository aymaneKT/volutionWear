import express from "express";
import {
  addCoupon,
  deleteCoupon,
  getCouponsForUserController,
  editCouponController,
} from "../Controllers/couponController.js";
import { auth } from "../middleware/auth.js";
export const router = express.Router();

router.post("/coupon", [auth], addCoupon);
router.delete("/coupon/:id", [auth], deleteCoupon);
router.get("/coupons/:id", getCouponsForUserController);
router.put("/coupon",[auth], editCouponController);
