const express = require('express')
const router = express()
const authController = require('../controllers/auth.controller')

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logOutUser)

module.exports = router