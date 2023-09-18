const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BlacklistedToken = require('../models/blacklistedToken'); // Import your BlacklistedToken model

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username ? username : null } });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    // Set the token in an HTTP-only cookie
    const cookieHeader = `token=${token}; HttpOnly; Max-Age=3600; Secure; SameSite=Strict; Path=/`;
    res.setHeader('Set-Cookie', cookieHeader);
    // res.cookie('token', token, {
    //   httpOnly: true, // Make the cookie HTTP-only
    //   maxAge: 9072000,   // Set the expiration time (1 hour in seconds)
    //   secure: true,   // Enable this on HTTPS connections
    //   sameSite: 'strict', // Adjust this based on your requirements
    //   path: '/',       // Adjust the path based on your application's routes
    // });

    return res.json({
      message: 'Login successful', user: {
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    // console.log("🚀 ~ file: authController.js:54 ~ exports.logout= ~ token:", token);
    // Add the token to the blacklist table
    await BlacklistedToken.create({ token, reason: 'logout' });

    // Clear the token cookie by setting it to an empty value and an expiration date in the past
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0), // Set the expiration date to a past date
      secure: true, // Enable this on HTTPS connections if applicable
      sameSite: 'strict', // Adjust this based on your requirements
      path: '/', // Adjust the path based on your application's routes
    });
    // console.log(req);

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

