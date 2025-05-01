import express from "express";
const app = express();
app.use(express.json());
const port = process.env.port;
import cors from "cors";

app.use(cors());
app.use("/uploads", express.static("uploads"));

import { router as userRouter } from "./Routes/userRoutes.js";
import { router as productRouter } from "./Routes/productsRoutes.js";
import { router as imageRouter } from "./Routes/imagesRouter.js";
import { router as couponRouter } from "./Routes/couponRouter.js";
import { router as reviewsRouter } from "./Routes/reviewRouter.js";
// import { router as orderRouter } from "./Routes/ordersRouter.js";
// import { router as orderItemRouter } from "./Routes/orderItemRouter.js";
// import {router as userAuthRouter} from "./Routes/userRoutes.js";
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", imageRouter);
app.use("/api", couponRouter);
app.use("/api", reviewsRouter);
// app.use("/api", orderRouter);
// app.use("/api", orderItemRouter);
// app.use("/api", userAuthRouter);

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`app listening on port ${port}`);
});
