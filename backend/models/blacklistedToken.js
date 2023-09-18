// models/blacklistedToken.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path

const BlacklistedToken = sequelize.define('BlacklistedToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = BlacklistedToken;
