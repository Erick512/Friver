const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const profileController = require('../controllers/userProfile') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, profileController.getProfile)
router.get('/:id', profileController.getUserProfile)
router.post('/creatProfile',  upload.single("file"), profileController.createProfile)

module.exports = router