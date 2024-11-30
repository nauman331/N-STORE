const jwt = require('jsonwebtoken');
const userModel = require("../models/usermodel")

function adminMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({message: 'user is not logged in'})

  jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {


    if (err) return res.status(403).json({message:'token expired please login in again'})

      const founduser = await userModel.findById(user.userId)
      req.user = founduser
    if(founduser.isAdmin == false) return res.status(400).json({message: 'Only admin can do this task'})

    next()
  })
}

module.exports = adminMiddleware;