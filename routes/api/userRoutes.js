// Import the Express Router
const router = require('express').Router();

// Import controller functions for user operations
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// Set up routes for /api/users
router
  .route('/')
  .get(getUsers) // GET request to retrieve all users
  .post(createUser); // POST request to create a new user

// Set up routes for /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser) // GET request to retrieve a single user by ID
  .put(updateUser) // PUT request to update a user by ID
  .delete(deleteUser); // DELETE request to delete a user by ID

// Set up routes for /api/users/:userId/friends/:friendId
router
  .route('/users/:userId/friends/:friendId')
  .post(addFriend) // POST request to add a friend to a user's friend list
  .delete(deleteFriend); // DELETE request to delete a friend from a user's friend list

// Export the router to be used in other parts of the application
module.exports = router;
