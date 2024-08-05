const express = require('express');
const { pushMenu, updateAddon, getStoreStatus, updateStoreStatus } = require('../controller/petPooja.controller');
const router = express.Router()

router.post('/push-menu',pushMenu)
router.post('/update-addon',updateAddon)
router.post('/update-items',updateAddon)
router.post('/get-store-status',getStoreStatus)
router.post('/update-store-status',updateStoreStatus)

module.exports = router;
