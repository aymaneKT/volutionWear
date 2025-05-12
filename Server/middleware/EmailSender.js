import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "login",
    user: "volutionwear@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});
