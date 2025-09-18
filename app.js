const express = require('express');
const app = express();

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Include node path module
const path = require('path');

// Serve /public/* (so index.html’s links work as written)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve the main page at '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Mount apiRouter
const apiRouter = require('./server/api');
app.use('/api', apiRouter);


// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).send(err.message || 'Something broke!');
});




module.exports = app;