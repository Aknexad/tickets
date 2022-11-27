const express = require('express');
const userModels = require('../models/models');

const route = express.Router();

route.post('/', async (req, res) => {
  try {
    const userChack = await userModels.findOne({ username: req.body.username });

    if (userChack) return res.send('user exist');

    const user = await userModels.create({
      username: req.body.username,
      passowrd: req.body.passowrd,
    });
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.send(error);
  }
});

module.exports = route;
