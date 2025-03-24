import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const key = process.env.KEY;

const option = {
  algorithm: "HS256",
  expiresIn: "1h",
};

export const getPayload = (token) => {
  const payload = jwt.decode(token, { complete: true });
  return payload;
};

export const generateToken = (id, email, is_seller) => {
  const payload = { id: id, email: email, is_seller: is_seller };
  const token = jwt.sign(payload, key, option);
  return token;
};

export const checkToken = (token) => {
  return jwt.verify(token, key, option);
};
