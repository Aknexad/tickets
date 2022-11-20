const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();
const app = express();

// proxy

app.use(
  '/user',
  createProxyMiddleware({
    target: 'http://localhost:4000/',
    changeOrigin: true,
  })
);

// middleware
app.use(express.json());

// routes

// server
app.listen(process.env.PORT, () => console.log('api gateway is up runing'));
