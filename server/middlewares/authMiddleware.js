const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({msg: 'user is not logged in'})

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.status(403).json({msg:'token expired please login in again'})

    req.user = user

    next()
  })
}

module.exports = authenticateToken;