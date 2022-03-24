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

// ALL POSTS ON PAGE
exports.getAllPosts = (req, res, next) => {
  let sql =
    "SELECT posts.id as postId, posts.*, users.* FROM posts INNER JOIN users ON users.id=posts.idUser ORDER BY posts.id DESC";
  dbConnect.execute(sql, function (err, result) {
    if (err) res.status(400).json({ err });
    res.status(200).json(result);
  });
};
