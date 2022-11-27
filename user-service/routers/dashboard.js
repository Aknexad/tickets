const express = require('express');

const userModels = require('../models/models');

const route = express.Router();

route.get('/', async (req, res) => {
  res.send('userdash');
});

route.get('/all', async (req, res) => {
  const allUsers = await userModels.find();
  res.send(allUsers);
});

module.exports = route;
