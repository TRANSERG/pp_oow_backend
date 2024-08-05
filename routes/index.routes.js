const express = require('express')

const router = express.Router()

const auth = require('./auth.routes')
const store = require('./store.routes')
const petPooja = require('./petPooja.route')

router.use('/api/auth',auth )
router.use('/api/setting',store)
router.use('/api/petpooja',petPooja)


module.exports = router;
