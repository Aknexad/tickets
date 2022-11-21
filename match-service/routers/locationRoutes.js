const express = require('express');

const db = require('../models/data');

const route = express.Router();

route.get('/', (req, res) => {
  res.json(db.location);
});

route.post('/', (req, res) => {
  const location = req.body.location;
  db.location.push(location);
  res.send('done');
});
route.delete('/', (req, res) => {
  const location = req.body.location;
  db.location.findIndex(time => time === location);
  res.send('location remove');
});

module.exports = route;
