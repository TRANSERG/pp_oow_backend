const { SignupUser, VerifyOtp, loginUser, refreshToken } = require("../controller/auth.controller")


const express = require('express')
const verifyToken = require("../middlewares/authJwt")
const router = express.Router()


router.post('/signup', SignupUser)
router.post('/verify', VerifyOtp)
router.post('/login', loginUser)
router.get('/refresh',[verifyToken], refreshToken)


module.exports = router;