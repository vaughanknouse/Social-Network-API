// Import the 'connect' and 'connection' functions from the 'mongoose' package
const { connect, connection } = require('mongoose');

// Define the MongoDB connection URI, specifying the local server and database name ('socialnetworkDB')
const connectionString = 'mongodb://127.0.0.1:27017/socialnetworkDB';

// Use the 'connect' function to establish a connection to the MongoDB database using the Mongoose pacakge
connect(connectionString)
  .then(() => {
    console.log('Mongoose has successfully connected to the MongoDB database.');
  })
  .catch((err) => {
    console.error('Mongoose connection error:', err);
  });

// Export the 'connection' object, representing the active connection to the MongoDB database
module.exports = connection;
