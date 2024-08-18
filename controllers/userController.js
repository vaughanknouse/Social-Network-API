// Import the User and Thought models
const { User, Thought } = require('../models');

// Export the functions to be used in the routes folder
module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      // Fetch all users from the database
      const users = await User.find();
      // Send the users as a JSON response
      res.json(users);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Get a single user by ID
  async getSingleUser(req, res) {
    try {
      // Find one user by ID and populate the 'thoughts' and 'friends' fields
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v');

      // If no user is found, send a 404 status with a message
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }

      // Send the user as a JSON response
      res.json(user);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      // Create a new user with the request body data
      const user = await User.create(req.body);
      // Send the created user as a JSON response
      res.json(user);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Error creating user: ${err.message}` });
    }
  },

  // Update a user by ID
  async updateUser(req, res) {
    try {
      // Find and update a user by ID with the new data from the request body
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, // Find user by ID
        { $set: req.body }, // Update user data with request body data
        { runValidators: true, new: true } // Return updated user data
      );

      // If no user is found, send a 404 status with a message
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }

      // Send the updated user as a JSON response
      res.json(user);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Error updating user: ${err.message}` });
    }
  },

  // Delete a user by ID and remove user's associated thoughts upon deletion
  async deleteUser(req, res) {
    try {
      // Find and delete a user by ID
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      // If no user is found, send a 404 status with a message
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }

      // Delete all thoughts associated with the user
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      // Send a success message as a JSON response
      res.json({
        message: 'User and associated thoughts deleted!',
      });
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: `Error deleting user and associated thoughts: ${err.message}`,
      });
    }
  },

  // Add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      // Add a friend to the user's friend list
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, // Find the user by ID
        { $addToSet: { friends: req.params.friendId } }, // Use $addToSet to avoid duplicates
        { new: true, runValidators: true } // Return the updated user
      );

      // If no user is found, send a 404 status with a message
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }

      // Send a success message and the updated user as a JSON response
      res.json({ message: 'New friends added!', user });
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: `Error adding new friend: ${err.message}` });
    }
  },

  // Remove a friend from a user's friend list
  async deleteFriend(req, res) {
    try {
      // Find and update a user by ID to remove a friend from the friends array
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, // Find the user by ID
        { $pull: { friends: req.params.friendId } }, // Use $pull to remove the friend
        { new: true, runValidators: true } // Return the updated user
      );

      // If no user is found, send a 404 status with a message
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      // Send a success message and the updated user as a JSON response
      res.json({ message: 'Friend successfully deleted!', user });
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Error deleting friend: ${err.message}` });
    }
  },
};
