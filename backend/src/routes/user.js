const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const validEmail = require("../middleware/email");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const password = require("../middleware/password");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/one", auth, userCtrl.getOneUser);
router.get("/", auth, userCtrl.getAllUsers);
router.delete("/delete/:id", auth, userCtrl.deleteUser);
router.put("/:id", auth, password, userCtrl.modifyPassword);
router.put("/:id", auth, multer, userCtrl.modifyProfilPicture);
router.put("/:id", auth, userCtrl.updateProfilDescription);
router.get("/me", auth, userCtrl.me);

module.exports = router;
