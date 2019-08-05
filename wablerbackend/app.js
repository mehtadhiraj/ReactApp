require('dotenv').config();

var express = require('express');

// Import handlers
const errHandler = require('./controllers/error');
var app = express();

require('./config/database')(); // Initializing database 
require('./config/middleware')(app); //Include middlewares
require('./routes/index')(app); // Include Routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('404 NOT FOUND !!!');
  err.status = 400;
  next(err);
});

// error handler
app.use(errHandler);

module.exports = app;
