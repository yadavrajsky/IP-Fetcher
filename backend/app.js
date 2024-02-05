const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const result = dotenv.config();
const path = require('path');
const sequelize = require('./config/db'); // Adjust the path to your Sequelize configuration
const cors = require('cors');

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
}
// Import the apiRouter
const app = express();
const PORT = process.env.PORT || 3000;
// Define a list of allowed origins (replace with your own domains)
const allowedOrigins = [ 'http://localhost:3000','http://localhost:5173'];

// Configure CORS middleware
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the requesting origin is in the list of allowed origins
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'Content-Length,Authorization',
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const apiRouter = require('./routes/apiRoutes');
// Use the apiRouter for all routes starting with /api
app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
});