import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.KEY;
const KEY = "gLXAqTgm7rWKe8EREPsYuLz4SJsZBj6vy8j80GJGUTfljZl7Dg5MP95dkB4RlYOq";
const option = {
  algorithm: "HS256",
  expiresIn: "1h",
};

export const getPayload = (token) => {
  const payload = jwt.decode(token, { complete: true });
  return payload;
};

export const generateToken = (id, email) => {
  const payload = { id: id, email: email };
  const token = jwt.sign(payload, KEY, option);
  return token;
};

export const checkToken = (token) => {
  jwt.verify(token, KEY, option);
};
