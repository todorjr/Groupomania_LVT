const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const validEmail = require("../middleware/email");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const password = require("../middleware/password");

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", auth, userCtrl.getAllUsers);
router.delete("/delete/:id", auth, userCtrl.deleteUser);
router.put("/update/:id", userCtrl.updateDescription);
router.put("/updatePass/:id", userCtrl.updatePassword);

router.get("/me", auth, userCtrl.me);

module.exports = router;
