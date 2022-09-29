const express = require('express')
const router = express.Router()
const feedController = require('../controllers/feed')
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, feedController.getFeed)
router.post('/createPost', ensureAuth, upload.single("file") ,feedController.createPost)
router.get('/getPost/:id', feedController.getPost)
router.put('/likePost/:id', feedController.likePost)
router.put('/likeFeedPost/:id', feedController.likeFeedPost)
router.delete('/deletePost/:id', feedController.deletePost)

module.exports = router