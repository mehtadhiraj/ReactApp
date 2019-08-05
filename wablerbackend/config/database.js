const mongoose = require('mongoose');

module.exports = function(){

    console.log('DATABASE Initialization...');

    var dbUri = process.env.DB_URI;
    const options = {
        useNewUrlParser: true,
        reconnectTries: 10,
        family: 4,
        autoIndex: false,
        keepAlive: true
    }
    mongoose.set('debug', true)
    // // Promise for connection to MongoDB URI
    mongoose.Promise = global.Promise;  
    mongoose.connect(dbUri, options); 
    const connection = mongoose.connection;
    // Connection Response Types
    // For handling and reporting conection successful
    connection.on('connected', function () {
        console.log('Trying to connect: ' + dbUri);
        console.log('Database Connection Status: Successful');
        console.log('Database Connnection Established: ' + dbUri);

        // Ending Database Connections
        console.log('DATABASE Initialized !!');
    });

    // For handling and reporting error
    connection.on('error', function (err) {
        console.log('Trying to connect: ' + dbUri);
        console.log('Database Connection Status: Unsuccessful');
        console.log('Database Connection Error: ' + err);

        // Ending Database Connections
        console.log('DATABASE Initialized !!');
    });

    // For handling and reporting disconnection
    connection.on('disconnected', function () {
        console.log('Trying to connect: ' + dbUri);
        console.log('Database Connection Status: Unsuccessful');
        console.log('Database Connection: Disconnected');

        // Ending Database Connections
        console.log('DATABASE Initialized !!');
    });   
}
