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
export const getUsernameCredential = async (username) => {
  try {
    const [user] = await connection.query(
      `SELECT id FROM users WHERE username = ?`,
      [username]
    );
    return user.length > 0;
  } catch (error) {
    throw error;
  }
};
export const getUserEmailCredential = async (email) => {
  try {
    const [user] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );
    return user.length > 0;
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
  is_seller,
  image
) => {
  try {
    const user = await connection.query(
      `INSERT INTO users (nome, cognome, username, email, password, is_seller , image) VALUES (?, ?, ?, ?, ?, ? , ?)`,
      [nome, cognome, username, email, password, is_seller, image]
    );

    return user[0].insertId;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (
  id,
  username,
  nome,
  cognome,
  email,
  image,
  phone_number,
  city,
  cap,
  country
) => {
  try {
    console.log({
      id,
      nome,
      cognome,
      email,
      phone_number,
      city,
      cap,
      country,
    });

    const query = `
    UPDATE users
    SET username = ?, nome = ?, cognome = ?, email = ?, image = ? , phone_number = ?, city = ?, cap = ?, country = ?
    WHERE id = ?
  `;
    const result = await connection.query(query, [
      username,
      nome,
      cognome,
      email,
      image,
      phone_number,
      city,
      cap,
      country,
      id,
    ]);

    return result[0].affectedRows > 0;
  } catch (error) {
    throw error;
  }
};
