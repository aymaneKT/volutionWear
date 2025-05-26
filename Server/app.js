import express from "express";
const app = express();
app.use(express.json());
const port = process.env.port;
import cors from "cors";

app.use(cors());
app.use("/uploads", express.static("uploads"));

import { router as userRouter } from "./Routes/userRoutes.js";
import { router as productRouter } from "./Routes/productsRoutes.js";
import { router as couponRouter } from "./Routes/couponRouter.js";
import { router as reviewsRouter } from "./Routes/reviewRouter.js";
import { router as ordersRouter } from "./Routes/ordersRouter.js";
app.use("/api", userRouter);
app.use("/api", productRouter);;
app.use("/api", couponRouter);
app.use("/api", reviewsRouter);
app.use("/api", ordersRouter);

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`app listening on port ${port}`);
});
