import { connection } from "../config/DataBase.js";

export const getAllUsers = async () => {
  try {
    const query = "SELECT * FROM users";
    const [rows] = await connection.query(query);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (
  nome,
  cognome,
  username,
  email,
  password,
  is_seller
) => {
  try {
    const query =
      "INSERT INTO users (nome , cognome , username , email , password , is_seller) VALUES (? ,? ,? ,? ,? ,?)";
    const data = await connection.query(query, [
      nome,
      cognome,
      username,
      email,
      password,
      is_seller,
    ]);

    const insertId = data[0].insertId;
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const query =
      "SELECT id ,nome , cognome , username , email , is_seller FROM users WHERE id = ?";

    const [rows] = await connection.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const query = "DELETE FROM users WHERE id = ?";
    connection.query(query, [id]);
  } catch (error) {
    throw error;
  }
};
