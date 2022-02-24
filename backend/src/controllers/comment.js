const dbConnect = require("../../config/db");

exports.createComment = (req, res, next) => {
  const post = {
    comment: req.body.comment,
    idCreator: req.body.idCreator,
    idPost: req.body.idPost,
  };
  let sql = `UPDATE posts SET post.comment = post.comment + 1 WHERE idPost=?;`;
  dbConnect.execute(sql, [req.body.idPost], function (err, result) {
    if (err) res.status(400).json({ err });
    let sql = `INSERT INTO comments (comment, firstName, idPost) VALUES (?,?,?);`;
    dbConnect.execute(
      sql,
      [post.comment, post.firstName, post.idPost],
      function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(201).json({ message: `Comment added !` });
      }
    );
  });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.id;
  connectDB.query(
    "DELETE FROM comments WHERE id=?",
    [commentId],
    async (error, result) => {
      if (error) {
        throw new Error(error);
      } else if (result.affectedRows < 1) {
        throw new NotFoundError("This comment does not exist");
      } else {
        res.send("Comment deleted");
      }
    }
  );
};
