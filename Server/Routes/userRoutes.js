import express from "express";
export const router = express.Router();
import {
  getUsers,
  getSingleUser,
  addSingleUser,
  deleteSingleUser,
} from "../Controllers/userController.js";
router.get("/users", getUsers);
router.get("/user/:id", getSingleUser);
router.post("/user", addSingleUser);
router.delete("/user/:id", deleteSingleUser);
