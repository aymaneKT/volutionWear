import { connection } from "../config/DataBase.js";

export const newAction = async (admin_id, action, details) => {
  try {
    const query =
      "INSERT INTO admin_actions (admin_id , action , details ) VALUES (? , ? , ?)";
    await connection.query(query, [admin_id, action, details]);
    return;
  } catch (error) {
    throw error;
  }
};
