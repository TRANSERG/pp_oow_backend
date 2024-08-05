const express = require('express');
const { createStore, getUserStores } = require('../controller/store.controller');
const authJwt = require('../middlewares/authJwt');
const { getStoreDetails } = require('../controller/settings/store.details.controller');
const router = express.Router()

router.post('/store',[authJwt],createStore)
router.get('/store',[authJwt],getUserStores)


//details
router.get('/store/details',[authJwt],getStoreDetails)

module.exports = router;
