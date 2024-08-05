const { SignupUser, VerifyOtp, loginUser, refreshToken, me, logout } = require("../controller/auth.controller")


const express = require('express')
const verifyToken = require("../middlewares/authJwt")
const router = express.Router()


router.post('/signup', SignupUser)
router.post('/verify', VerifyOtp)
router.post('/login', loginUser)
router.get('/refresh', refreshToken)
router.get('/me',[verifyToken],me)
router.get('/logout',[verifyToken],logout)


module.exports = router;