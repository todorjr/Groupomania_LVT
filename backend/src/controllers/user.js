const User = require("../models/User");
const dbConnect = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const fs = require("fs");

exports.signup = (req, res, next) => {
  let sql = `SELECT * FROM 'users' WHERE email=?`;
  dbConnect.execute(sql, [req.body.email], function (err, result) {
    console.log(result);
    if (!result) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
          };
          let sql = `INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?);`;
          dbConnect.execute(
            sql,
            [user.firstName, user.lastName, user.email, user.password],
            function (err, result) {
              if (err) throw err;
              res
                .status(201)
                .json({ message: `User ${user.firstName} added !` });
            }
          );
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      res.status(401).json({ message: "Email already existe ." });
    }
  });
};

exports.login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("You have to fill all fields !");
    }
    dbConnect.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, result) => {
        if (result.length == 0) {
          throw new Error("wrong email adress");
        }
        if (!bcrypt.compare(password, result[0].password)) {
          throw new Error("wrong password");
        }
        const id = result[0].id;
        res.status(200).json({
          id: id,
          token: jwt.sign({ id: id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          }),
        });
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.getOneUser = (req, res, next) => {
  let sql = `SELECT * FROM user WHERE user.id=${req.body.userId};`;
  dbConnect.query(sql, function (err, result) {
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

exports.deleteUser = (req, res, next) => {
  const userToDeleteId = req.params.id;
  const userSelfId = res.locals.userId;
  if (userToDeleteId !== userSelfId) {
    connectDB.query(
      "DELETE FROM user WHERE id=?",
      [userToDeleteId],
      async (error, result) => {
        if (error) {
          throw new Error(error);
        } else if (result.affectedRows < 1) {
          throw new Error("this user does not exist");
        } else {
          res.send("user deleted");
        }
      }
    );
  } else {
    connectDB.query(
      "DELETE FROM user WHERE id=?",
      [userSelfId],
      async (error, result) => {
        if (error) {
          throw new Error(error);
        } else if (result.affectedRows < 1) {
          throw new Error("this user does not exist");
        } else {
          res.send("user deleted");
        }
      }
    );
  }
};
