// models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'usernameUniqueConstraint',
      msg: 'Username already exists. Please choose a different username.', // Custom validation message
    },
    validate: {
      notEmpty: {
        msg: 'Username cannot be empty.', // Custom validation message
      },
      notNull: {
        msg: 'Username cannot be null.', // Custom validation message
      },
    },  
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password cannot be empty.', // Custom validation message
      },
      notNull: {
        msg: 'Password cannot be null.', // Custom validation message
      },
    },
  },
});

module.exports = User;
