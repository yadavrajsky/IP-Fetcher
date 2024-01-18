const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path

const IPAddress = sequelize.define('IPAddress', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIP: {
        args: [4,6], // Validate as IPv4 addresses
        msg: 'Invalid IP address format.', // Custom validation message
      },
    },
  },
}, {
  timestamps: true, // Enable timestamps (createdAt and updatedAt)
  createdAt: 'createdAt', // Customize the column name for createdAt
  updatedAt: 'updatedAt', // Customize the column name for updatedAt
});

module.exports = IPAddress;
