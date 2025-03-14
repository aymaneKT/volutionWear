import express from "express";
const app = express();
app.use(express.json());

import { router as userRouter } from "./Routes/userRoutes.js";
import { router as productRouter } from "./Routes/productRoutes.js";
import { router as reviewsRouter } from "./Routes/reviewsRouter.js";

app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", reviewsRouter);

const port = 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`app listening on port ${port}`);
});
