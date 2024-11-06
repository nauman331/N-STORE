const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id.toString(), email: user.email,username: user.username, phone:user.phone, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = generateAccessToken;
