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
    res.send('my tickets');
  } catch (error) {}
});

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  console.log(authHeader);
  console.log(token);

  if (token === null || token === undefined) return res.status(401);
  console.log(req.body);
  next();
}

app.listen(process.env.PORT, () => console.log('tickets service is running'));
