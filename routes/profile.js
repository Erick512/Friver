const express = require('express')
const router = express.Router()
const profileController = require('../controllers/userProfile') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, profileController.getProfile)
router.get('/:id', profileController.getUserProfile)
router.post('/creatProfile', ensureAuth, profileController.createProfile)

module.exports = router