const express = require('express')
const router = express.Router()
const qrCodeController = require('../controllers/qrCode') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, qrCodeController.getQRCode)

module.exports = router