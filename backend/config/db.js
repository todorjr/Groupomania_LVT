const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const dbConnect = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "root",
  database: "groupomania",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

dbConnect.connect(function (error) {
  if (error) throw error;
  console.log("Connected to database!");
});

module.exports = dbConnect;
