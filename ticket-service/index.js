const express = require('express');

require('dotenv').config();

// db
require('./middleware/connectToDb');
const ticketModels = require('./models/models');

const {
  userAuthToken,
  adminAuthToken,
} = require('./middleware/authenticateToken');
//
const publisher = require('./utils/publisher');
const subscriber = require('./utils/subscriber');

const app = express();

// middleware
app.use(express.json());

app.get('/ticket/all', adminAuthToken, async (req, res) => {
  try {
    const allMatch = await ticketModels.find();
    res.send(allMatch);
  } catch (error) {
    res.send(error);
  }
});

app.post('/ticket', userAuthToken, async (req, res) => {
  const userId = req.user.id;
  const username = req.user.username;
  const matchId = req.body.matchId;
  const addTicket = await ticketModels.create({
    userId: userId,
    username: username,
    matchId: matchId,
    ticketStatus: false,
  });
  if (addTicket) {
    publisher(addTicket, { event: 'removeTicket', matchId: matchId });
    res.json(addTicket);
  } else {
    res.sendStatus(400);
  }
});

app.listen(process.env.PORT, () => console.log('tickets service is running'));
