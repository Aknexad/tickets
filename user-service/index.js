const express = require('express');

require('dotenv').config();

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/user', (req, res) => {
  res.send('user page');
});

// server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('user service runing'));
