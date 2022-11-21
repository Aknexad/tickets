const express = require('express');

const db = require('../models/data');

const route = express.Router();

// match
route.get('/all', (req, res) => {
  res.send(db.match);
});

route.post('/', (req, res) => {
  const bluePrint = {
    marchType: 'football',
    host: req.body.host,
    gast: req.body.gast,
    location: req.body.location,
    stadume: req.body.stadume,
    'data and time': Date.now(),
    auther: req.body.auther,
    totalTickets: 75000,
    freeTicket: 23000,
  };
  db.match.push(bluePrint);
  res.sendStatus(200);
});

route.delete('/', (req, res) => {
  const matchId = req.body.matchId;
  res.send(`${matchId} is delete`);
});

module.exports = route;
