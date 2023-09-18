// routes/postRoutes.js

const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Post API Root' });
});

router.get('/list', authenticateToken,(req, res) => {
  res.json({ message: 'List of Posts API' });
});

module.exports = router;
