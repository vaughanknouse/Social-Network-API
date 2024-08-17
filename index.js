// Import the Express module
const express = require('express');
// Import the database connection configuration
const db = require('./config/connection');
// Import the routes for the application
const routes = require('./routes');

// Define 3001 as the port for the server to listen on
const PORT = 3001;
// Create an instance of an Express application
const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodes from incoming requests
app.use(express.json());
// Middleware to use the route definitions imported from './routes'
app.use(routes);

// Connect to the MongoDB database and start the Express server on the defined port
db.once('open', () => {
  // Log a message indicating the server is running and which port it is using
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
