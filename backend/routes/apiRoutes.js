// routes/apiRoutes.js

const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');
const ipRoutes=require('./ipRoutes');
const authenticateToken = require('../middlewares/authenticateToken');

// Mount the userRoutes under /users
router.use('/auth', authRoutes);

// Mount the postRoutes under /posts
router.use('/posts', postRoutes);

// Mount the ipRoutes under /ips
router.use('/ip',authenticateToken, ipRoutes);

module.exports = router;
