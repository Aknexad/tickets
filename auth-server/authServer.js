const express = require('express');
const jwt = require('jsonwebtoken');

const userModels = require('./models/models');
const authenticationUser = require('./middleware/authenticationUser');

require('dotenv').config();
const app = express();

// conneect DB
require('./middleware/conneectDatabase');
// middleware
app.use(express.json());

// routes
app.post('/login', authenticationUser, async (req, res) => {
  try {
    const payload = req.payload;
    const accessToken = genarateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
    const pushToDb = await userModels
      .where({ _id: payload.id })
      .update({ token: refreshToken });
    if (pushToDb) {
      res.json({
        userInfo: payload,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.sendStatus(503);
    }
  } catch (error) {
    res.sendStatus(503);
  }
});

// get new access toekn
app.post('/accesstoekn', async (req, res) => {
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
