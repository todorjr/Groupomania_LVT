const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;
    res.locals.userId = userId;
    next();
  } catch {
    res.status(401).json({
      error: new Error("Invalid request"),
    });
    console.log("error");
  }
};