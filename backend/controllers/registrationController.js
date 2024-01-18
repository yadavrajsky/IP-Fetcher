// controllers/registrationController.js

const User = require('../models/user');
const Registration = require('../models/registration');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ where: { username: username ? username : null } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }
    const existingEmail = await Registration.findOne({ where: { email: email ? email : null } });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    await Registration.create({
      email,
      UserId: newUser.id,
    });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      // This error is a SequelizeValidationError
      // Handle validation error here
      // console.error('Validation error:', error.errors);
      // res.status(400).json({message:error.message});
      res.status(400).json({ ...error })

    } else {
      // Handle other types of errors
      console.error('Other error:', error);
      res.status(500).json({ ...error })
    }
  }
};
