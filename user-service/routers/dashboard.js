const express = require('express');

const userModels = require('../models/models');

const subscriber = require('../utils/subscriber');

const route = express.Router();

route.get('/', async (req, res) => {
  res.send('userdash');
});

route.get('/all', async (req, res) => {
  const allUsers = await userModels.find();
  res.send(allUsers);
});

route.get('/myTickets', eventHandler, async (req, res) => {
  const myTickets = await userModels.findOne({ _id: req.user.id });
  if (myTickets.tickets.length === 0)
    return res.send('you dont have aby tickets');
  res.send(myTickets.tickets);
});

function eventHandler(req, res, next) {
  subscriber(req.user.id);
  next();
}

module.exports = route;
