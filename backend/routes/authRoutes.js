const express = require('express');
const { login, logout } = require('../controllers/authController');
const { register } = require('../controllers/registrationController'); // Add this line
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);

module.exports = router;
