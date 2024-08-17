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

  // Get a single user by id
  async getSingleUser(req, res) {
    try {
      // Find one user by id and populate the 'thoughts' and 'friends' fields
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v');

      // If no user is found, send a 404 status with a message
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
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

  // Update a user by id
  async updateUser(req, res) {
    try {
      // Find and update a user by id with the new data from the request body
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      // If no user is found, send a 404 status with a message
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      // Send the updated user as a JSON response
      res.json(user);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Error updating user: ${err.message}` });
    }
  },

  // Delete a user by id
  async deleteUser(req, res) {
    try {
      // Find and delete a user by id
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      // If no user is found, send a 404 status with a message
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      // Delete all thoughts associated with the user
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      // Send a success message as a JSON response
      res.json({
        message: 'User and associated thoughts successfully deleted!',
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
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } }, // Use $addToSet to avoid duplicates
        { new: true, runValidators: true }
      );

      // If no user is found, send a 404 status with a message
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      // Send a success message and the updated user as a JSON response
      res.json({ message: 'Successfully added new friend!', user });
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
      // Find and update a user by id to remove a friend from the friends array
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }, // Use $pull to remove the friend
        { new: true, runValidators: true }
      );

      // If no user is found, send a 404 status with a message
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id' });
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
