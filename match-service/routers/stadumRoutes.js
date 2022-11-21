const express = require('express');

const db = require('../models/data');

const route = express.Router();

route.get('/', (req, res) => {
  res.json(db.stadume);
});

route.post('/', (req, res) => {
  const stadume = req.body.stadume;
  db.stadume.push(stadume);
  res.send('done');
});
route.delete('/', (req, res) => {
  const stadume = req.body.stadume;
  db.stadume.findIndex(time => time === stadume);
  res.send('stadume remove');
});

module.exports = route;
