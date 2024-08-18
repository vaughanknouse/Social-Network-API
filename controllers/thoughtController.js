// Import the Thought and User models
const { Thought, User } = require('../models');

// Export the functions to be used in the routes folder
module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      // Retrieve all thoughts from the database
      const thoughts = await Thought.find();
      // Respond with the list of thoughts as a JSON response
      res.json(thoughts);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Get a single thought by ID
  async getSingleThought(req, res) {
    try {
      // Find a single thought by ID
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      // If no thought is found, respond with a 404 status code
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with this ID!' });
      }
      // Respond with the found thought as JSON response
      res.json(thought);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Create and add a new thought for a user
  async createThought(req, res) {
    try {
      // Create a new thought with the provided data
      const thought = await Thought.create(req.body);

      // Find the user and add the new thought's ID to their list of thoughts
      const user = await User.findOneAndUpdate(
        { username: req.body.username }, // Find the user by their username
        { $addToSet: { thoughts: thought._id } }, // Add thought ID to user's thoughts array
        { runValidators: true, new: true } // Return the updated user
      );

      // If no user is found, respond with a 404 status code
      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but no user found with this ID!',
        });
      }

      // Respond with the created thought
      res.json(thought);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: `Error creating new thought: ${err.message}` });
    }
  },

  // Update a thought by ID
  async updateThought(req, res) {
    try {
      // Find the thought by its ID and update it with the new data from the request body
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Find the thought by its ID
        { $set: req.body }, // Update the thought with the new data
        { runValidators: true, new: true } // Return the updated thought
      );

      // If no thought is found, return a 404 status with an error message
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with this ID!' });
      }

      // If successful, return the updated thought in JSON format
      res.json(thought);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Error updating thought: ${err.message}` });
    }
  },

  // Delete a thought by ID and remove the thought reference from the user's thoughts array
  async deleteThought(req, res) {
    try {
      // Find the thought by its ID and delete it
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      // If no thought is found, return a 404 status with an error message
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with this ID!' });
      }

      // Remove the thought ID from the user's thoughts array
      await User.findOneAndUpdate(
        { username: thought.username }, // Find the user by the thought's username
        { $pull: { thoughts: req.params.thoughtId } }, // Pull the thought ID from the user's thoughts array
        { new: true, runValidators: true } // Return the updated user
      );

      // Respond with a success message indicating the thought and its reference were deleted
      res.json({
        message: 'Thought and its reference from user successfully deleted!',
      });
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: `Error deleting thought and its reference from user: ${err.message}`,
      });
    }
  },

  // Create and add a reaction to a thought stored in a single thought's reactions array
  async addReaction(req, res) {
    try {
      // Find the thought by its ID and add the new reaction to the reactions array
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Find the thought by its ID
        { $addToSet: { reactions: req.body } }, // Add the new reaction to the reactions array
        { new: true, runValidators: true } // Return the updated thought
      );

      // If no thought is found, return a 404 status with an error message
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with this ID!' });
      }

      // Respond with a success message indicating the reaction was added
      res.json({ message: 'New reaction added!' });
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: `Error adding new reaction: ${err.message}` });
    }
  },

  // Remove a reaction from a thought by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      // Find the thought by its ID and remove the reaction with the specified reactionId
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Find the thought by its ID
        { $pull: { reactions: { _id: req.params.reactionId } } }, // Pull the reaction by its reactionId
        { new: true, runValidators: true } // Return the updated thought
      );

      // If no thought is found, return a 404 status with an error message
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this ID!' });
        return;
      }

      // Respond with a success message indicating the reaction was deleted
      res.json({ message: 'Reaction successfully deleted!' });
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: `Error deleting reaction: ${err.message}` });
    }
  },
};
