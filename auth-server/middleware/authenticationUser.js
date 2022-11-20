const mongoose = require('mongoose');

const userModels = require('../models/models');

async function authenticationUser(req, res, next) {
  try {
    const user = await userModels.findOne({ username: req.body.username });
    if (!user) return res.send('username not match');
    if (user.passowrd === req.body.passowrd) {
      next();
    } else {
      res.send('username or passord not match');
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = authenticationUser;
