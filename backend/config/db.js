const mysql = require("mysql");
require("dotenv").config();

const dbConnect = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "lazar",
  password: "todorjr",
  database: "groupomania",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

dbConnect.connect(function (error) {
  if (error) throw error;
  console.log("Connected to database!");
});

module.exports = dbConnect;
