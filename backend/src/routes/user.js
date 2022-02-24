const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const validEmail = require("../middleware/email");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const password = require("../middleware/password");

router.post("/", auth, multer, validEmail, password, userCtrl.signUp);
router.post("/", auth, validEmail, password, userCtrl.logIn);
router.post("/", auth, userCtrl.getOneUser);
router.post("/", auth, userCtrl.getAllUsers);

router.delete("/:id", auth, userCtrl.deleteUser);
router.put("/:id", auth, password, userCtrl.modifyPassword);
router.put("/:id", auth, multer, userCtrl.modifyProfilPicture);
router.put("/:id", auth, userCtrl.modifyAccount);

module.exports = router;
