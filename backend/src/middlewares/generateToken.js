const jwt = require("jsonwebtoken");

const jwt_secret_code = process.env.JWT_SECRET; // Store this in .env for production

// Function to generate JWT token
function generateToken(userId, isAdmin, res) {
  const payload = { userId, isAdmin };

  // Sign the token with a secret and set an expiration time (e.g., 1 hour)
  const token = jwt.sign(payload, jwt_secret_code, { expiresIn: '7d' });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // Prevent XSS attacks
    sameSite: "Lax", // Change "None" to "Lax" for localhost
    secure: false, // Set to true only in production
  });

  return token;
};

module.exports = {
  generateToken
}