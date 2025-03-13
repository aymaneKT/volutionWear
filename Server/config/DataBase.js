import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();


export const connection = await mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

await connection.connect((err) => {
  if (err) {
    console.log("Errore nella conessione con DB", err);
    return;
  }
  console.log("Conessione con DB effetuata");
});
