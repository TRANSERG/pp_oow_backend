const express = require('express');
const { createStore, getUserStores } = require('../controller/store.controller');
const authJwt = require('../middlewares/authJwt');
const { getStoreDetails,updateStoreDetails } = require('../controller/settings/store.details.controller');
const { push_menu } = require('../controller/Items.controller');
const router = express.Router()

router.post('/store',[authJwt],createStore)
router.get('/store',[authJwt],getUserStores)


//details
router.get('/store/details/:id',[authJwt],getStoreDetails)
router.post('/store/details/:id',[authJwt],updateStoreDetails)


//additonal functions
router.post('/store/push-menu',[authJwt],push_menu)


module.exports = router;
