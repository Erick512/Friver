const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");

// router.get('/getComments/:id', commentController.getComments)
router.post("/createComment/:postId/:commentId?", commentController.createComment);
router.put("/likeComment/:id", commentController.likeComment)

module.exports = router;