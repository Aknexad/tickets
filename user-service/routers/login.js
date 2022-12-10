const express = require('express');
const jwt = require('jsonwebtoken');

const userModels = require('../models/models');

const route = express.Router();

route.post('/', async (req, res) => {
  try {
    const payload = req.payload;
    const accessToken = genarateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
    const pushToDb = await userModels
      .where({ _id: payload.id })
      .updateOne({ token: refreshToken });
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

function genarateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '30m' });
}

module.exports = route;
