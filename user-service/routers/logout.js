const express = require('express');

const userModels = require('../models/models');

const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const findeToken = await userModels.findOne({ _id: userId });
    findeToken.token = '';
    const deleteToken = await findeToken.save();
    if (!deleteToken) return res.sendStatus(403);
    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

module.exports = route;
