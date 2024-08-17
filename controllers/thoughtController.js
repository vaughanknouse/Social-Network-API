// Import the Thought and User models
const { Thought, User } = require('../models');

// Export the functions to be used in the routes folder
module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      // Fetch all thoughts from the database
      const thoughts = await Thought.find();
      // Send the thoughts as a JSON response
      res.json(thoughts);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Get a single thought by id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      // If no thought is found, send a 404 status with a message
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with this id!' });
      }

      // Send the thought as a JSON response
      res.json(thought);
      // Catch any errors and send a 500 status with the error message
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but no user found with this id!',
        });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Error creating thought: ${err.message}` });
    }
  },

  // Update a thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with this id!' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Error updating thought: ${err.message}` });
    }
  },

  // Delete a thought by id and its the associated user
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with this id!' });
      }

      // Remove the thought reference from the user's thoughts array
      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true, runValidators: true }
      );

      res.json({
        message: 'Thought and its reference from user successfully deleted!',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: `Error deleting thought and its reference from user: ${err.message}`,
      });
    }
  },

  // Create a reaction stored in a single thought's reactions array
  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with this id!' });
      }
      res.json({ message: 'Successfully added new reaction!' });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: `Error adding new reaction: ${err.message}` });
    }
  },

  // Pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true, runValidators: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json({ message: 'Reaction successfully deleted!' });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: `Error deleting reaction: ${err.message}` });
    }
  },
};
