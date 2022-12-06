const jwt = require('jsonwebtoken');

function userAuthToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(400);
    req.user = user;
    next();
  });
}

function adminAuthToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(400);
    if (user.isAdmin === false) return res.status(401);
    req.user = user;
    next();
  });
}

module.exports = { userAuthToken, adminAuthToken };
