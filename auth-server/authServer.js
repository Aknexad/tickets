const express = require('express');
const mongoose = require('mongoose');

const userModels = require('./models/models');
const authenticationUser = require('./middleware/authenticationUser');

require('dotenv').config();
const app = express();

// conneect DB
mongoose.connect('mongodb://localhost:27017/tickets', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

// middleware
app.use(express.json());

// routes
app.post('/login', authenticationUser, async (req, res) => {
  res.send('authentication');
});

// server
const port = process.env.PORT;
app.listen(port, () => console.log('auth server is runing'));
