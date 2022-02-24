const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const auth = require("./src/middleware/auth");
// const helmet = require("helmet");

require("dotenv").config();

const userRoutes = require("../backend/src/routes/user");
const postRoutes = require("../backend/src/routes/post");
const commentRoutes = require("../backend/src/routes/comment");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//JSON
app.use(bodyParser.json());

//Routes for users
app.use("/api/user", userRoutes);
app.use("/api/post", auth, postRoutes);
app.use("/api/comment", auth, commentRoutes);

//Images
app.use("/images", express.static(path.join(__dirname, "images")));

//Server
app.listen(process.env.PORT, () => {
  console.log("Listening on port ${process.env.PORT}");
});

module.exports = app;
