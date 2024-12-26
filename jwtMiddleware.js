const jwt = require('jsonwebtoken');

// Secret key (you should use an environment variable in production)
const SECRET_KEY = 'your_secret_key_here';

// Middleware function for JWT authentication
const authenticateJWT = (req, res, next) => {
  // Get token from headers
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Extract token from the header
    const token = authHeader.split(' ')[1];

    // Verify token
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid Token' });
      }

      // Attach user info to request object
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized: No Token Provided' });
  }
};

module.exports = authenticateJWT;
