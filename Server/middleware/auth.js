import dotenv from "dotenv";
import { checkToken } from "./token.js";
dotenv.config({ path: "../.env" });


export const auth = (req, res, next) => {
  const header = req.header("Authorization");
  if (!header) {
    return res.status(401).json({
      error: "Access Denied",
    });
  }
  try {
    const token = header.replace("Bearer", "").trim();
    const user = checkToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
