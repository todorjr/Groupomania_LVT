const User = require("../models/User");
const dbConnect = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.signup = (req, res, next) => {
  let sql = `SELECT * FROM 'users' WHERE email=?`;
  dbConnect.execute(sql, [req.body.email], function (err, result) {
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
            isAdmin: "0",
          };
          let sql = `INSERT INTO users (firstName, lastName, email, password,description,isAdmin) VALUES (?,?,?,?,?,?);`;
          dbConnect.execute(
            sql,
            [
              user.firstName,
              user.lastName,
              user.email,
              user.password,
              user.description,
              user.isAdmin,
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

exports.getAllUsers = (req, res, next) => {
  dbConnect.execute("SELECT * FROM users ", async (error, result) => {
    if (error) {
      throw new Error(error);
    } else {
      res.send(result);
    }
  });
};

exports.me = (req, res, next) => {
  try {
    const id = res.locals.userId;
    console.log("me", id);
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
    throw new Error("User is not allowed");
  }
};

exports.updateDescription = (req, res, next) => {
  const id = req.params.id;
  const newDescription = req.body.description;
  dbConnect.query(
    "UPDATE users SET description=? WHERE id=?",
    [newDescription, id],
    async (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        res.send("User updated");
      }
    }
  );
};

exports.updatePassword = (req, res, next) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;
  dbConnect.query(
    "UPDATE users SET password=? WHERE id=?",
    [newPassword, id],
    async (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        res.send("Password updated");
      }
    }
  );
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
        res.send("User deleted");
      }
    }
  );
};
