import { generateToken } from "../middleware/token.js";
import {
  getUser,
  login,
  register,
  getUsernameCredential,
  getUserEmailCredential,
} from "../models/user.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const GetUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUser(id);

    if (!user) {
      return res.status(404).json({
        error: "user doesn't exist",
      });
    }
    return res.json({
      data: user,
    });
  } catch (error) {
    throw error;
  }
};

export const Register = async (req, res) => {
  try {
    const { nome, cognome, username, email, password, is_seller  } = req.body;
    if (
      !nome ||
      !cognome ||
      !username ||
      !email ||
      !password ||
      is_seller == undefined
    ) {
      return res.status(400).json({
        error: "Not all required fields are filled in",
      });
    }

    const isUserDuplicated = await getUsernameCredential(username);
    if (isUserDuplicated) {
      return res.status(400).json({
        error: "Username is already taken",
      });
    }
    if (await getUserEmailCredential(email)) {
      return res.status(400).json({
        error: "Email is already taken",
      });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password." });
      }

      let userId;
      if (req.file) {
        const invalidFile = !req.file.mimetype.startsWith("image/");
        if (invalidFile) {
          return res.status(403).json({
            success: false,
            message: "file is not a valid image",
          });
        }
        userId = await register(
          nome,
          cognome,
          username,
          email,
          hash,
          is_seller,
          req.file.filename
        );
      } else
        userId = await register(
          nome,
          cognome,
          username,
          email,
          hash,
          is_seller,
          null
        );

      const userAdded = await getUser(userId);
      const token = generateToken(userId, email, is_seller);
      res.status(200).json({
        token: token,
        user: userAdded,
      });
    });
  } catch (error) {
    throw error;
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        error: "Not all required fields are filled in",
      });
    }

    const user = await login(email);

    if (!user) {
      return res.status(404).json({
        error: "user doesn't exist",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }
    const token = generateToken(user.id, user.email, user.is_seller);
    const userFound = await getUser(user.id);
    return res.status(200).json({
      token: token,
      user: userFound,
    });
  } catch (error) {
    throw error;
  }
};
