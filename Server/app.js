import express from "express";
const app = express();
app.use(express.json());

import { router as userRouter } from "./Routes/userRoutes.js";
import { router as productRouter } from "./Routes/productRoutes.js";
import { router as reviewsRouter } from "./Routes/reviewsRouter.js";
import { router as orderRouter } from "./Routes/ordersRouter.js";
import { router as orderItemRouter } from "./Routes/orderItemRouter.js";
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", reviewsRouter);
app.use("/api", orderRouter);
app.use("/api", orderItemRouter);

const port = 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`app listening on port ${port}`);
});
