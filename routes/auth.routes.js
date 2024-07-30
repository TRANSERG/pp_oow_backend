const { SignupUser, VerifyOtp, loginUser, refreshToken } = require("../controller/auth.controller")


const express = require('express')
const router = express.Router()


router.post('/signup', SignupUser)
router.post('/verify', VerifyOtp)
router.post('/login', loginUser)
router.get('/refresh',refreshToken)


module.exports = router;