import express from "express";
const app = express();
app.use(express.json());

import { router as userRouter } from "./Routes/userRoutes.js";

app.use("/api", userRouter);

const port = 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`app listening on port ${port}`);
});
