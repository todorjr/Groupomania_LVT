const User = require("../models/User");
const dbConnect = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const fs = require("fs");

exports.signUp = (req, res, next) => {
  let sql = `SELECT * FROM 'users' WHERE email=?`;
  dbConnect.execute(sql, [req.body.email], function (err, result) {
    let user = new User();
    if (!user) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const image = `${req.protocol}://${req.get("host")}/images/pp.png`;
          const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            imageUrl: image,
          };
          let sql = `INSERT INTO 'users' (firstName, lastName, email, password, pp) VALUES (?,?,?,?,?)`;
          dbConnect.execute(
            sql,
            [
              user.firstName,
              user.lastName,
              user.email,
              user.password,
              user.image,
            ],
            function (err, result) {
              if (err) throw err;
              res.status(201).json({ message: `User ${user.prenom} added !` });
            }
          );
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      res.status(401).json({ message: "Email already existe ." });
    }
  });
};

exports.logIn = (req, res, next) => {
  let sql = `SELECT * FROM 'users' WHERE email=?`;

  dbConnect.execute(sql, [req.body.email], function (err, result) {
    let user = new User();
    if (!user) return res.status(401).json({ error: "Email is incorrect..." });
    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Password is inccorect !" });
        }
        console.log("User connected!");
        res.status(200).json({
          userId: user.id,
          token: jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN_KEY, {
            expiresIn: "24h",
          }),
        });
      })
      .catch((error) =>
        res.status(500).json({ message: "Error with  authentification" })
      );
  });
};

exports.getOneUser = (req, res, next) => {
  let sql = `SELECT * FROM user WHERE user.id=${req.body.userId};`;
  dbConnect.execute(sql, function (err, result) {
    if (err) res.status(400).json({ err });
    res.status(200).json(result);
  });
};

exports.getAllUsers = (req, res, next) => {
  dbConnect.execute("SELECT * FROM users ", async (error, result) => {
    if (error) {
      throw new Error(error);
    } else {
      res.send(result);
    }
  });
};

exports.modifyPassword = (req, res, next) => {
  if (req.body.password) {
    let sql = `SELECT * FROM users WHERE id=?`;
    dbConnect.execute(sql, [req.params.id], function (err, result) {
      let user = new User();
      bcrypt
        .compare(req.body.oldPassword, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: " Password is incorrect !" });
          } else {
            bcrypt
              .hash(req.body.password, 10)
              .then((hash) => {
                let sql = `UPDATE users
                              SET password= ?
                              WHERE id = ?;`;
                dbConnect.execute(
                  sql,
                  [hash, req.params.id],
                  function (err, result) {
                    if (err) throw err;
                    res.status(200).json({ message: "Password changed !" });
                  }
                );
              })
              .catch((error) => res.status(500).json({ error }));
          }
        })
        .catch((error) =>
          res.status(400).json({ message: "Error with authentification" })
        );
    });
  }
};

exports.modifyAccount = (req, res, next) => {
  if (req.body.nom != "") {
    let sql = `UPDATE users
              SET firstName= ?
              WHERE id = ?`;
    dbConnect.execute(
      sql,
      [req.body.firstName, req.params.id],
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  if (req.body.lastName != "") {
    let sql = `UPDATE users
              SET lastName= ?
              WHERE id = ?;`;
    dbConnect.execute(
      sql,
      [req.body.lastName, req.params.id],
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  res.status(200).json({ message: "Information user update" });
};

exports.modifyProfilPicture = (req, res, next) => {
  if (req.file) {
    let sql = `SELECT * FROM users WHERE id = ?`;
    dbConnect.execute(sql, [req.params.id], function (err, result) {
      if (err) res.status(400).json({ err });
      if (!result[0])
        res.status(400).json({ message: "We can not find any ID in table..." });
      else {
        // IF USER HAS AN IMAGE,DELETE IT FROM FOLDER
        if (User.imageUrl != "http://localhost:3000/images/profile/pp.png") {
          const name = User.imageUrl.split("/images/profile/")[1];
          fs.unlink(`images/profile/${name}`, () => {
            if (err) console.log(err);
            else console.log("Image changed !");
          });
        }
        // GET DATA FROM USERS
        let image = req.file
          ? `${req.protocol}://${req.get("host")}/images/profile/${
              req.file.filename
            }`
          : "";
      }
    });
  }
};
exports.deleteUser = (req, res) => {
  userModel.deleteUser(req.params.id, (err, User) => {
    if (err) res.send(err);
    res.json({ success: true, message: "User deleted!" });
  });
};
