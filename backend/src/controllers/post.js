const dbConnect = require("../../config/db");
const fs = require("fs");

// DEFINE USER INPUT
exports.createPost = (req, res, next) => {
  const image = req.file
    ? `${req.protocol}://${req.get("host")}/images/post/${req.file.filename}`
    : "";
  const textSend = req.body.text ? req.body.text : " ";
  const post = {
    text: textSend,
    imageUrl: image,
    likePost: 0,
    date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
    idCreator: req.body.userId,
  };
  // SEND THE REQUEST WITH MULTER AND DEFAULT VALUES
  let sql = `INSERT INTO posts (text, imageUrl, date, idCreator) VALUES (?,?,?,?);`;
  dbConnect.execute(
    sql,
    [dbConnect.text, dbConnect.imageUrl, dbConnect.date, dbConnect.idCreator],
    function (err, result) {
      if (err) throw err;
      res.status(201).json({ message: `Status added !` });
    }
  );
};

exports.deletePost = (req, res, next) => {
  let sql = `SELECT * FROM posts WHERE id = ?`;
  dbConnect.execute(sql, [req.params.id], function (err, result) {
    if (err) res.status(400).json({ err });
    if (!result[0])
      res.status(400).json({ message: "We can not find any ID in table..." });
    else {
      if (result[0].authorId == req.body.userId || req.body.admin == true) {
        // IF POST IS AN IMAGE,DELETE THAT IMAGE FROM FOLDER
        if (result[0].imageUrl != "") {
          const name = result[0].imageUrl.split("/images/post/")[1];
          fs.unlink(`images/post/${name}`, () => {
            if (err) console.log(err);
            else console.log("Image deleted  !");
          });
        }
      }
    }
  });
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

// ALL POSTS ON PAGE
exports.getAllPosts = (req, res, next) => {
  let sql =
    "SELECT * FROM posts JOIN users WHERE user.id=idCreator ORDER BY date DESC LIMIT 50;";
  dbConnect.execute(sql, function (err, result) {
    if (err) res.status(400).json({ err });
    res.status(200).json(result);
  });
};

//GET ONE POST
exports.getOnePost = (req, res, next) => {
  let sql = `SELECT * FROM posts JOIN users WHERE user.id=idCreator AND idCreator=? ORDER BY date DESC;`;
  dbConnect.execute(sql, [req.body.id], function (err, result) {
    if (err) res.status(400).json({ err });
    res.status(200).json(result);
  });
};
