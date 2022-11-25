const express = require('express');

require('dotenv').config();

// db
require('./middleware/connectToDb');

const ticketModels = require('./models/models');

const app = express();

// middleware
app.use(express.json());

app.get('/ticket/all', async (req, res) => {
  try {
    const allMatch = await ticketModels.find();
    res.send(allMatch);
  } catch (error) {
    res.send(error);
  }
});

app.get('/ticket/my', async (req, res) => {
  try {
    const userId = req.body.id;
    const userTickets = await ticketModels.find({
      _id: userId,
    });
    res.json(userTickets);
  } catch (error) {
    res.send(error);
  }
});

app.post('/ticket', async (req, res) => {
  const userId = req.body.userid;
  const matchId = req.body.matchId;
  const addTicket = await ticketModels.create({
    userId: userId,
    matchId: matchId,
    ticketStatus: false,
  });
  if (addTicket) {
    res.json(addTicket);
  } else {
    res.sendStatus(400);
  }
});

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  if (token === null || token === undefined) return res.status(401);
  console.log(req.body);
  next();
}

app.listen(process.env.PORT, () => console.log('tickets service is running'));
