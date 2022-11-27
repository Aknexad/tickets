const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(400);
    if (user.isAdmin === false) return res.send('only admin ');
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
