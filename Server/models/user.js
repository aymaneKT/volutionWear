import { connection } from "../config/DataBase.js";

export const getUser = async (id) => {
  try {
    const [user] = await connection.query(
      `SELECT id, email , username , nome , cognome , is_seller FROM users WHERE id = ?`,
      [id]
    );
    return user[0];
  } catch (error) {
    throw error;
  }
};

export const login = async (email) => {
  try {
    const [user] = await connection.query(
      `SELECT id, email , username , nome , cognome , is_seller , password FROM users WHERE email = ?`,
      [email]
    );

    return user[0];
  } catch (error) {
    throw error;
  }
};

export const register = async (
  nome,
  cognome,
  username,
  email,
  password,
  is_seller
) => {
  try {
    const user = await connection.query(
      `INSERT INTO users (nome, cognome, username, email, password, is_seller) VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, cognome, username, email, password, is_seller]
    );

    return user[0].insertId;
  } catch (error) {
    throw error;
  }
};
