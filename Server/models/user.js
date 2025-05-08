import { connection } from "../config/DataBase.js";

export const getUser = async (id) => {
  try {
    const [user] = await connection.query(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);
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
    if (user.length > 0)
      return {
        isUsedUsername: true,
        id: user[0].id,
      };
    return false;
  } catch (error) {
    throw error;
  }
};
export const getUserEmailCredential = async (email) => {
  try {
    const [user] = await connection.query(
      `SELECT id FROM users WHERE email = ? `,
      [email]
    );
    if (user.length > 0)
      return {
        isUsedEmail: true,
        id: user[0].id,
      };
    return false;
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

export const updateProfile = async (id, data) => {
  try {
    const fields = [];
    const values = [];

    
    for (const [key, value] of Object.entries(data)) {
      if (value !== null && value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    if (fields.length === 0) {
      return false;
    }

    values.push(id);
    const query = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = ?
  `;
    const result = await connection.query(query, values);

    return result[0].affectedRows > 0;
  } catch (error) {
    throw error;
  }
};
