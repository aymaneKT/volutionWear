import { connection } from "../config/DataBase.js";

export const login = async (email) => {
  const query =
    "SELECT id, username , nome , cognome , email , password, is_seller  FROM users WHERE email = ? ";
  const [result] = await connection.query(query, [email]);
  return result.length > 0 ? result[0] : null;
};
