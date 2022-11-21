const express = require('express');

const db = require('../models/data');

const route = express.Router();

route.get('/', (req, res) => {
  res.json(db.time);
});

route.post('/', (req, res) => {
  const timeName = req.body.name;
  db.time.push(timeName);
  res.send('done');
});
route.delete('/', (req, res) => {
  const timeName = req.body.name;
  db.time.findIndex(time => time === timeName);
  res.send('time remove');
});

module.exports = route;
