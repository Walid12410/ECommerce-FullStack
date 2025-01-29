const jwt = require("jsonwebtoken");

const jwt_secret_code = process.env.JWT_SECRET; // Store this in .env for production

// Function to generate JWT token
function generateToken(userId, isAdmin, res) {
  const payload = { userId, isAdmin };

  // Sign the token with a secret and set an expiration time (e.g., 1 hour)
  const token = jwt.sign(payload, jwt_secret_code, { expiresIn: '7d' });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development"
  });


  return token;
};

module.exports = {
  generateToken
}