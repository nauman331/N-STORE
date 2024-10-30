const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = generateAccessToken;
