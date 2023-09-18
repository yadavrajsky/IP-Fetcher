const express = require('express');
const { insertIPAddress } = require('../controllers/ipController');
const ipChecking = require('../middlewares/ipChecking');

const router = express.Router();

router.get('',ipChecking, insertIPAddress);
router.post('',ipChecking, insertIPAddress);

module.exports = router;
