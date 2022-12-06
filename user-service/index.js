const express = require('express');
//
const authenticationUser = require('./middleware/authenticationUser');
const authenticateToken = require('./middleware/authenticateToken');
const dashRoute = require('./routers/dashboard');
const registerRoute = require('./routers/register');
const loginRoute = require('./routers/login');
const logoutRoute = require('./routers/logout');

require('dotenv').config();

const app = express();

// conneect DB
require('./middleware/connectToDb');
// middleware
app.use(express.json());

// routes
app.use('/user/dash', authenticateToken, dashRoute);
app.use('/user/register', registerRoute);
app.use('/user/login', authenticationUser, loginRoute);
app.use('/user/logout', authenticateToken, logoutRoute);

// server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('user service runing'));
