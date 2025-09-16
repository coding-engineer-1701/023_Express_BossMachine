const express = require('express');
const app = express();

module.exports = app;

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');


app.use('/api', apiRouter);

// Final call is to error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).send(err.message || 'Something broke!');
});



