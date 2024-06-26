require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const verifyToken = require('./middleware/verifyToken'); // Import verifyToken middleware
const User=require('./Models/User');

const app = express();

// Connect Database
connectDB();

// Enable CORS for all routes
const allowedOrigins = [
    'http://localhost:3000',
    'chrome-extension://koeafocjgdokpaophncedandepnpiibd'
  ];
  
  // Configure CORS middleware
  app.use(cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/auth'));

// Example backend route to fetch user profile data
// Example backend route to fetch user profile data

  
  
// Route that requires token verification
app.use('/api/users', verifyToken, require('./routes/users'));
app.use('/api/dashboard', verifyToken, require('./routes/dashboard'));
app.use('/api/activity',verifyToken, require('./routes/activity')); // Activity routes
app.use('/api/setTimeLimit',verifyToken, require('./routes/timeLimit'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
