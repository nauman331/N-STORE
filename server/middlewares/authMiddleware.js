const jwt = require('jsonwebtoken');
const userModel = require("../models/usermodel")

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({msg: 'user is not logged in'})

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {


    if (err) return res.status(403).json({msg:'token expired please login in again'})
      const founduser = await userModel.findById(user.userId)
      req.user = founduser

    next()
  })
}

module.exports = authenticateToken;