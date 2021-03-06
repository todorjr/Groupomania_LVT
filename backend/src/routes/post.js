const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/all", auth, postCtrl.getAllPosts);
router.post("/create", multer, postCtrl.createPost);
router.delete("/delete/:id", auth, postCtrl.deletePost);

module.exports = router;
