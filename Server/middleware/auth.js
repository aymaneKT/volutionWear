import { checkToken } from "./token.js";

export const auth = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({
      error: "Access Denied",
    });
  }
  try {
    const token = header.replace("Bearer", "").trim();
    checkToken(token);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
