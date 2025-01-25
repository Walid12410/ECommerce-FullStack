const jwt = require("jsonwebtoken");

const jwt_secret_code = process.env.JWT_SECRET; // Store this in .env for production

// Function to generate JWT token
function generateToken(userId, isAdmin,res) {
  const payload = { userId, isAdmin };

  // Sign the token with a secret and set an expiration time (e.g., 1 hour)
  const token = jwt.sign(payload, jwt_secret_code, { expiresIn: '7d' });

  return token;
};

module.exports = {
  generateToken
}