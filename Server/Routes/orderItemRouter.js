import express from "express";
import { addSingleProductToOrder , updateSingleProductInOrder } from "../Controllers/orderItemController.js";
import { auth } from "../middleware/auth.js";
export const router = express.Router();

router.post("/addproducttoorder", [auth], addSingleProductToOrder);
router.patch("/editproductiorder", [auth], updateSingleProductInOrder);

//manca la rimozione e modifica
