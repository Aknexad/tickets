const express = require('express');

require('dotenv').config();

//
const matchRoutes = require('./routers/matchRoutes');
const teamRoutes = require('./routers/timeRoutes');
// const locationRoutes = require('./routers/locationRoutes');
const stadiumRoutes = require('./routers/stadumRoutes');

const authenticateToken = require('./middleware/authenticateToken');

// connect to databace
require('./middleware/connectToDb');

const app = express();

// middleware
app.use(express.json());

// Routerss

app.use('/match', matchRoutes);
app.use('/match/team', authenticateToken, teamRoutes);
app.use('/match/stadium', authenticateToken, stadiumRoutes);

// server
app.listen(process.env.PORT, () => console.log('match service is running'));
