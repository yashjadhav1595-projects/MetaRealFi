const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const SECRET_KEY = process.env.JWT_SECRET || 'a7f9e3b2c5d1e8f6a4b2c9d7e5f3a1b8c6d4e2f9a7b5c3d1e8f6a4b2c9d7e5';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Token is not valid' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization header required' });
  }
};

// Mock user database
const users = [
  { id: 1, email: 'user@gmail.com', password: 'Password123!', name: 'Test User' }
];

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = users.find(u => u.email === email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create token payload
  const payload = { 
    id: user.id,
    email: user.email,
    name: user.name
  };
  
  // Sign token
  const token = jwt.sign(
    payload, 
    SECRET_KEY, 
    { expiresIn: process.env.TOKEN_EXPIRY || '1h' }
  );

  res.json({ 
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    email,
    password,
    name
  };
  
  users.push(newUser);
  
  res.status(201).json({ message: 'User registered successfully' });
});

// Protected routes
app.get('/api/dashboard/data', authenticateJWT, (req, res) => {
  // Return some mock data
  res.json({
    portfolioValue: 8245780.35,
    properties: 7,
    transactions: 12,
    recentActivity: [
      { id: 1, type: 'purchase', property: 'Luxury Villa', amount: 1250000, date: '2023-05-15' },
      { id: 2, type: 'sale', property: 'Downtown Apartment', amount: 750000, date: '2023-05-10' }
    ]
  });
});

app.get('/api/profile', authenticateJWT, (req, res) => {
  res.json(req.user);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Add this route
app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    // Find or create user
    let user = users.find(u => u.email === email);
    if (!user) {
      user = {
        id: users.length + 1,
        email,
        name,
        googleId
      };
      users.push(user);
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRY || '1h' }
    );

    res.json({ token, user });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ message: 'Google authentication failed' });
  }
});