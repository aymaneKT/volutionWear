import { addUser, getAllUsers, getUser, deleteUser } from "../models/user.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUser(id);

    if (!user) {
      return res.status(401).json({
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

export const addSingleUser = async (req, res) => {
  try {
    const user = req.body;
    const { nome, cognome, username, email, password, is_seller } = user;
    if (
      !user.nome ||
      !user.cognome ||
      !user.username ||
      !user.email ||
      !user.password ||
      is_seller == undefined
    ) {
      return res.status(401).json({
        error: "Not all required fields are filled in",
      });
    }
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password." });
      }
      const userId = await addUser(nome, cognome, username, email, hash, false);
      const userAdded = await getUser(userId);
      console.log(userAdded);

      res.status(200).json({
        user: userAdded,
      });
    });
  } catch (error) {
    throw error;
  }
};

export const deleteSingleUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await getUser(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "user not found",
      });
    }

    await deleteUser(id);
    res.status(201).json({
      result: true,
    });
  } catch (error) {
    throw error;
  }
};
