const express = require('express');
const { login, logout } = require('../controllers/authController');
const { register } = require('../controllers/registrationController'); // Add this line
const authenticateToken = require('../middlewares/authenticateToken');
const { insertIPAddress } = require('../controllers/ipController');

const router = express.Router();

router.get('', insertIPAddress);
router.post('', insertIPAddress);

module.exports = router;
