import express from "express";

import {
  getAdminActionsController,
  markActionAsReadController,
} from "../Controllers/adminActionsController.js";

import { auth } from "../middleware/auth.js";

export const router = express.Router();

router.get("/notifications/:sellerId", getAdminActionsController);
router.put("/notifications/:actionId", auth, markActionAsReadController);
