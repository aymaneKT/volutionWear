const express = require("express");
const mysql = require("mysql2");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());
require("dotenv").config();
const saltRounds = 10;
const port = 3000;

//db section and server section//
const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connection.connect((err) => {
  if (err) {
    console.log("Errore nella conessione con DB", err);
    return;
  }
  console.log("Conessione con DB effetuata");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`app listening on port ${port}`);
});
//== db section and serrver section ==//

app.post("/user", (req, res) => {
  const { username, nome, cognome, email, password, is_seller } = req.body;

  if (!username || !email || !password || is_seller == undefined)
    return res
      .status(422)
      .json({ error: "Not all required fields are filled in." });

  const query =
    "INSERT INTO users (username, nome, cognome, email, password, is_seller) VALUES (?, ?, ?, ?, ?, ?)";

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password." });
    }
    connection.query(
      query,
      [username, nome, cognome, email, hash, is_seller],
      (err, result) => {
        if (err) {
          res.json({ error: err });
        }

        connection.query(
          "SELECT username , nome , cognome ,email , is_seller FROM users WHERE id = ?",
          [result.insertId],
          (err, results) => {
            if (err) {
              res.json({ errore: "user aggiunto , err nel recupero", err });
            }
            res.status(200).json(results[0]);
          }
        );
      }
    );
  });
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;

  const query =
    "SELECT id , nome , cognome , username , email,created_at,is_seller FROM users where id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(422).json({ error: err });
      return;
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
      result;
    } else {
      res.status(422).json({ error: "utente non trovato" });
    }
  });
});
