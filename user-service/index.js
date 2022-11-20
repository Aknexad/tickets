const express = require('express');
const mongoose = require('mongoose');

const userModels = require('./models/models');

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
app.get('/user', async (req, res) => {
  const allUsers = await userModels.find();
  res.send(allUsers);
});

app.post('/user/register', async (req, res) => {
  const user = new userModels(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('user service runing'));