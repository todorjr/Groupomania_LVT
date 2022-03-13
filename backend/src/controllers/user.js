const User = require("../models/User");
const dbConnect = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv").config();
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
            description: req.body.description,
          };
          let sql = `INSERT INTO users (firstName, lastName, email, password,description) VALUES (?,?,?,?,?);`;
          dbConnect.execute(
            sql,
            [
              user.firstName,
              user.lastName,
              user.email,
              user.password,
              user.description,
            ],
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
        console.log(result);

        const id = result[0].id;
        const firstName = result[0].firstName;
        const lastName = result[0].lastName;

        res.status(200).json({
          id: id,
          firstName: firstName,
          lastName: lastName,
          token: jwt.sign(
            { id: id, firstName: firstName, lastName: lastName },
            "RANDOM_TOKEN_SECRET",
            {
              expiresIn: "24h",
            }
          ),
        });
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.getOneUser = (req, res, next) => {
  let sql = `SELECT * FROM users WHERE users.id=${req.body.userId};`;
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
exports.me = (req, res, next) => {
  try {
    const id = res.locals.userId;
    dbConnect.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      (error, result) => {
        if (error) {
          throw new Error(error);
        } else {
          console.log(result);

          res.send(result);
        }
      }
    );
  } catch {
    throw new Error("user not allowed");
  }
};

// exports.modifyAccount = (req, res, next) => {
//   if (req.body.nom != "") {
//     let sql = `UPDATE users
//               SET firstName= ?
//               WHERE id = ?`;
//     dbConnect.execute(
//       sql,
//       [req.body.firstName, req.params.id],
//       function (err, result) {
//         if (err) throw err;
//       }
//     );
//   }
//   if (req.body.lastName != "") {
//     let sql = `UPDATE users
//               SET lastName= ?
//               WHERE id = ?;`;
//     dbConnect.execute(
//       sql,
//       [req.body.lastName, req.params.id],
//       function (err, result) {
//         if (err) throw err;
//       }
//     );
//   }
//   res.status(200).json({ message: "Information user update" });
// };

exports.updateProfilDescription = (req, res, next) => {
  const id = res.locals.userId;
  const newDescription = req.body.description;
  dbConnect.query(
    "UPDATE users SET description=? WHERE id=?",
    [newDescription, id],
    async (error, result) => {
      if (error) {
        throw new Error(error);
      } else if (result.affectedRows < 1) {
        throw new NotFoundError("this user does not exist");
      } else {
        res.send("user updated");
      }
    }
  );
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

  dbConnect.query(
    "DELETE FROM users WHERE id=?",
    [userToDeleteId],
    async (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        res.send("user deleted");
      }
    }
  );
};
