const express = require('express');

const route = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const publisher = require('../utils/publisher');

const { Match, Team, Stadium, MatchType } = require('../models/models');

// match
route.get('/all', async (req, res) => {
  const matchs = await Match.find();
  res.send(matchs);
});

route.get('/', async (req, res) => {
  try {
    const matchType = await MatchType.find();
    const teams = await Team.find();
    const stadiums = await Stadium.find();

    res.json({
      matchType: matchType,
      teams: teams,
      stadiums: stadiums,
      location: [stadiums.map(st => st.location)],
    });
  } catch (error) {
    res.send(error);
  }
});

route.post('/', authenticateToken, async (req, res) => {
  try {
    const createMatch = await Match.create({
      matchType: req.body.matchType,
      host: req.body.host,
      visitor: req.body.visitor,
      stadium: req.body.stadium,
      author: req.user.username,
      totalTickets: '100',
      remainingTickets: '45',
    });

    res.json({ message: 'OK', info: createMatch });
  } catch (error) {
    res.send(error);
  }
});

route.delete('/', authenticateToken, async (req, res) => {
  try {
    const id = req.body.id;
    const deletMatch = await Match.deleteOne({ _id: id });
    if (deletMatch.deletedCount === 0) return res.sendStatus(400);
    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

module.exports = route;
