const dbConnect = require("../../config/db");
const Post = require("../models/post");
const fs = require("fs");

// DEFINE USER INPUT
exports.createPost = (req, res, next) => {
  const idUser = req.body.id;
  const text = req.body.text;
  let image;
  if (req.file == null) {
    image = null;
  } else {
    image = `/images/${req.file.filename}`;
  }

  const datePost = new Date();
  dbConnect.query(
    "INSERT INTO posts SET ?",
    { text: text, date: datePost, idUser: idUser, image: image },
    (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        res.send(result);
      }
    }
  );
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
  dbConnect.query(
    "DELETE FROM posts WHERE id=?",
    [postId],
    async (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        res.send("post deleted");
      }
    }
  );
};

exports.modifyPost = (req, res, next) => {
  if (req.file) {
    let sql = `SELECT * FROM posts WHERE id = ?`;
    dbConnect.execute(sql, [req.params.id], function (err, result) {
      if (err) res.status(400).json({ e });
      if (!result[0])
        res.status(400).json({ message: "We can not find any ID in table..." });
      else {
        // IF POST IS AN IMAGE,DELETE THAT IMAGE FROM FOLDER
        if (result[0].imageUrl != "") {
          const name = result[0].imageUrl.split("/images/post/")[1];
          fs.unlink(`images/${name}`, () => {
            if (err) console.log(err);
            else console.log("Image deleted !");
          });
        }
        // GET DATA FROM USERS
        let image = req.file
          ? `${req.protocol}://${req.get("host")}/images/post/${
              req.file.filename
            }`
          : "";
        let textSend = req.body.post ? req.body.post.text : " ";
        const post = {
          text: textSend,
          imageUrl: image,
          date: new Date().toLocaleString("af-ZA", {
            timeZone: "Europe/Paris",
          }),
        };
      }
    });
  }
};
// "SELECT posts.id AS postId, posts.* FROM posts JOIN users WHERE users.id=posts.idUser"

// ALL POSTS ON PAGE
exports.getAllPosts = (req, res, next) => {
  let sql =
    "SELECT posts.id as postId, posts.*, users.* FROM posts INNER JOIN users ON users.id=posts.idUser";
  dbConnect.execute(sql, function (err, result) {
    if (err) res.status(400).json({ err });
    res.status(200).json(result);
  });
};

// GET ONE POST
exports.getOnePost = (req, res, next) => {
  let sql = `SELECT * FROM posts JOIN users WHERE users.id=idCreator AND idCreator=? ORDER BY date DESC;`;
  dbConnect.execute(sql, [req.body.id], function (err, result) {
    if (err) res.status(400).json({ err });
    res.status(200).json(result);
  });
};
