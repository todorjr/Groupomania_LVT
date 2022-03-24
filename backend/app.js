const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const auth = require("./src/middleware/auth");
const dotenv = require("dotenv").config();
const userRoutes = require("./src/routes/user");
const postRoutes = require("./src/routes/post");
const commentRoutes = require("./src/routes/comment");

const app = express();

//Headers CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Package pour afficher un log de toutes les requêtes envoyées.
app.use(morgan("combined"));

//Conversion en JSON
app.use(bodyParser.json());

//Gestion des images
app.use("/images", express.static(path.join(__dirname, "images")));

//Routes des utilisateurs, articles et commentaires
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

module.exports = app;
