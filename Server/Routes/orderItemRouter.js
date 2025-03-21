import express from "express";
import { addSingleProductToOrder } from "../Controllers/orderItemController.js";
export const router = express.Router();

router.post("/addproducttoorder", addSingleProductToOrder);


//manca la rimozione e modifica