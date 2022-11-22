const express = require('express');

const route = express.Router();

const { Match, Team, Stadium } = require('../models/models');

// match
route.get('/all', async (req, res) => {
  const matchs = await Match.find();
  res.send(matchs);
});

route.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    const stadiums = await Stadium.find();
    const city = [];
    stadiums.forEach(st => city.push(st.location));
    res.json({ teams: teams, stadiums: stadiums, location: city });
  } catch (error) {
    res.send(error);
  }
});

route.post('/', async (req, res) => {
  try {
    const createMatch = await Match.create({
      matchType: req.body.matchType,
      host: req.body.host,
      visitor: req.body.visitor,
      stadium: req.body.stadium,
      author: 'admin1',
      totalTickets: '100',
      remainingTickets: '45',
    });

    res.json({ message: 'OK', info: createMatch });
  } catch (error) {
    res.send(error);
  }
});

route.delete('/', async (req, res) => {
  try {
    const id = req.body.id;
    const deletMatch = await Match.deleteOne({ _id: id });
    console.log(deletMatch);
    if (deletMatch.deletedCount === 0) return res.sendStatus(400);
    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

module.exports = route;
