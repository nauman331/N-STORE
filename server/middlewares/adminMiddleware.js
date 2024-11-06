const jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({msg: 'user is not logged in'})

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {


    if (err) return res.status(403).json({msg:'token expired please login in again'})

    req.user = user
    console.log(user.isAdmin)
    if(user.isAdmin == false) return res.status(400).json({msg: 'Only admin can do this task'})

    next()
  })
}

module.exports = adminMiddleware;