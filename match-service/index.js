const express = require('express');

require('dotenv').config();

//
const matchRoutes = require('./routers/matchRoutes');
const teamRoutes = require('./routers/timeRoutes');
// const locationRoutes = require('./routers/locationRoutes');
const stadiumRoutes = require('./routers/stadumRoutes');

// connect to databace
require('./middleware/connectToDb');

const app = express();

// middleware
app.use(express.json());

// Routers
app.use('/match', matchRoutes);
app.use('/match/team', teamRoutes);
// app.use('/match/location', locationRoutes);
app.use('/match/stadium', stadiumRoutes);

// server
app.listen(process.env.PORT, () => console.log('match service is running'));
