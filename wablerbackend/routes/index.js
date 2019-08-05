
var staticRouter = require('./static');
var usersRouter = require('./users');
var messageRouter = require('./messages');

module.exports = function(app){
  console.log('ROUTES Initialization...');

  app.use('/', staticRouter);
  app.use('/users', usersRouter);
  app.use('/messages', messageRouter);

  console.log('ROUTES Initialized !!');
}

