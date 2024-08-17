// Import the Express Router
const router = require('express').Router();

// Import controller functions for thought operations
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// Set up routes for /api/thoughts
router
  .route('/')
  .get(getThoughts) // GET request to retrieve all thoughts
  .post(createThought); // POST request to create a new thought

// Set up routes for /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought) // GET request to retrieve a single thought by ID
  .put(updateThought) // PUT request to update a thought by ID
  .delete(deleteThought); // DELETE request to delete a thought by ID

// Set up routes for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction); // POST request to add a reaction to a thought

// Set up routes for /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction); // DELETE request to remove a reaction by ID

// Export the router to be used in other parts of the application
module.exports = router;
