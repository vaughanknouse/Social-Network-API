// Import the Express router
const router = require('express').Router();

// Import route modules for thoughts and users
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// Use the thoughtsRoutes for any requests with the '/thoughts' prefix
router.use('/thoughts', thoughtRoutes);

// Use the usersRoutes for any requests with the '/users' prefix
router.use('/users', userRoutes);

// Export the router to be used in other parts of the application
module.exports = router;
