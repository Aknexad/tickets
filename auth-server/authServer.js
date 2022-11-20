const express = require('express');

const userModels = require('./models/models');
const authenticationUser = require('./middleware/authenticationUser');

require('dotenv').config();
const app = express();

// conneect DB
require('./middleware/conneectDatabase');
// middleware
app.use(express.json());

// routes
app.post('/login', authenticationUser, async (req, res) => {
  res.send('done');
});

// server
const port = process.env.PORT;
app.listen(port, () => console.log('auth server is runing'));
