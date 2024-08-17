// Import the Express Router
const router = require('express').Router();

// Import API routes from the './api' directory
const apiRoutes = require('./api');

// Use the API routes for any requests with the '/api' prefix
router.use('/api', apiRoutes);

// Handle any routes that do not match the defined API routes
// Respond with a message indicating that the route is incorrect
router.use((req, res) => {
  return res.send('Wrong route!');
});

// Export the router for use in other parts of the application
module.exports = router;
