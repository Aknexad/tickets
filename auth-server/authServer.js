const express = require('express');
const jwt = require('jsonwebtoken');

const authenticateToken = require('./middleware/authenticateToken');

require('dotenv').config();
const app = express();

// conneect DB
require('./middleware/conneectDatabase');
// middleware
app.use(express.json());

// get new access toekn
app.post('/auth/accesstoekn', authenticateToken, async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  const isInDatabase = await userModels.findOne({ token: refreshToken });
  if (!isInDatabase) return res.sendStatus(403);

  //   jwt verfy and response new toekn
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = genarateAccessToken(user);
    res.json({ accessToken: accessToken });
  });
});

//
function genarateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
}

// server
const port = process.env.PORT;
app.listen(port, () => console.log('auth server is runing'));
