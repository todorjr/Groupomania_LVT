const dbConnect = require("../../config/db");
const Comment = require("../models/comments");

exports.createComment = (req, res, next) => {
  // Create a comment
  const idUser = req.body.id;
  const idPost = req.body.idPost;
  const comment = req.body.comment;
  const firstName = req.body.firstName;
  const datePost = new Date();
  dbConnect.query(
    "INSERT INTO comments SET ?",
    {
      date: datePost,
      comment: comment,
      idUser: idUser,
      idPost: idPost,
      firstName: firstName,
    },
    (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        res.send(result);
      }
    }
  );
};

exports.getAllComments = (req, res, next) => {
  //Get all comments
  const idPost = req.params.id;
  let sql = "SELECT * FROM comments WHERE idPost=?";
  dbConnect.query(sql, [idPost], function (err, result) {
    if (err) res.status(400).json({ err });
    res.status(200).json(result);
  });
};

exports.deleteComment = (req, res, next) => {
  //Delete a comment
  const commentId = req.params.id;
  dbConnect.query(
    "DELETE FROM comments WHERE id=?",
    [commentId],
    async (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        res.send("Comment deleted");
      }
    }
  );
};
