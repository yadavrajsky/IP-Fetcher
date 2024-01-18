// models/registration.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path
const Registration = sequelize.define('Registration', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'emailUniqueConstraint',
      msg: 'Email already in use. Please use a different email.', // Custom validation message
    },
    validate: {
      isEmail: {
        msg: 'Invalid email format. Please provide a valid email address.', // Custom validation message
      },
      notNull: {
        msg: 'Email cannot be null.', // Custom validation message
      }
    },
  },
});

module.exports = Registration;