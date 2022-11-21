const express = require('express');

require('dotenv').config();

//
const matchRoutes = require('./routers/matchRoutes');
const timeRoutes = require('./routers/timeRoutes');
const locationRoutes = require('./routers/locationRoutes');
const stadumeRoutes = require('./routers/stadumRoutes');

const app = express();

express.Router;

// middleware
app.use(express.json());

// Routers
app.use('/match', matchRoutes);
app.use('/match/time', timeRoutes);
app.use('/match/location', locationRoutes);
app.use('/match/stadume', stadumeRoutes);

// server
app.listen(process.env.PORT, () => console.log('match service is running'));
