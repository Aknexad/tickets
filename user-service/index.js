const express = require('express');
const mongoose = require('mongoose');

const userModels = require('./models/models');

require('dotenv').config();

const app = express();

// conneect DB
mongoose.connect('mongodb://localhost:27017/user_service', {
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
  res.send('userdash');
});
app.get('/user/all', async (req, res) => {
  const allUsers = await userModels.find();
  res.send(allUsers);
});

app.post('/user/register', async (req, res) => {
  try {
    const user = await userModels.create({
      username: req.body.username,
      passowrd: req.body.passowrd,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('user service runing'));
