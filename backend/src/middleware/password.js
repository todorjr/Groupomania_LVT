const passwordSchema = require("../models/password");

module.exports = (req, res, next) => {
  console.log(res);
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({
      message:
        "Your password must contain: 8 characters minimum with uppercase, lowercase, number and without spaces",
    });
  } else {
    next();
  }
};
