const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('./jwtMiddleware'); // Path to your middleware file

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

const PORT = 3000;
const SECRET_KEY = 'your_secret_key_here';

// Login route to generate tokens
app.post('/login', (req, res) => {
  // Example user data
  const { username, password } = req.body;

  // Replace with actual user authentication logic
  const mockUser = { username: 'test', password: '1234' };
  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}! You have access.` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
