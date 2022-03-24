const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");

router.post("/create", commentCtrl.createComment);
router.delete("/:id", commentCtrl.deleteComment);
router.get("/:id", commentCtrl.getAllComments);

module.exports = router;
