// Import necessary modules from mongoose
const { Schema, model, Types } = require('mongoose');
// Import moment module to format timestamps
const moment = require('moment');

// Define the Reaction schema
const reactionSchema = new Schema(
  {
    // Field for the reaction ID
    reactionId: {
      type: Schema.Types.ObjectId, // Data type is ObjectId
      default: () => new Types.ObjectId(), // Automatically generate a new ObjectId by default
    },
    // Field for the reaction body text
    reactionBody: {
      type: String, // Data type is String
      required: true, // This field is required
      maxlength: 280, // Maximum length is 280 characters
    },
    // Field for the username of the person who reacted
    username: {
      type: String, // Data type is String
      required: true, // This field is required
    },
    // Field for the creation date of the reaction
    createdAt: {
      type: Date, // Data type is Date
      default: Date.now, // Set the default date to the current time
      // Getter to format the date using moment
      get: (createdAtVal) =>
        moment(createdAtVal).format('MMM Do, YYYY [at] hh:mm a'), // Format the date using moment
    },
  },
  {
    // Options for the schema
    toJSON: {
      virtuals: true, // Include virtuals when converting to JSON
      getters: true, // Include getters when converting to JSON
    },
    id: false, // Do not include the default `id` field in JSON output
  }
);

// Define the Thought schema
const thoughtSchema = new Schema(
  {
    // Field for the thought text
    thoughtText: {
      type: String, // Data type is String
      required: true, // This field is required
      minlength: 1, // Minimum length is 1 character
      maxlength: 280, // Maximum length is 280 characters
    },
    // Field for the creation date of the thought
    createdAt: {
      type: Date, // Data type is Date
      default: Date.now, // Set the default date to the current time
      // Getter to format the date using moment
      get: (createdAtVal) =>
        moment(createdAtVal).format('MMM Do, YYYY [at] hh:mm a'), // Format the date using moment
    },
    // Field for the username of the person who created the thought
    username: {
      type: String, // Data type is String
      required: true, // This field is required
    },
    // Field for the reactions to the thought, which is an array of reactionSchema
    reactions: [reactionSchema],
  },
  {
    // Options for the schema
    toJSON: {
      virtuals: true, // Include virtuals in JSON output
      getters: true, // Include getters in JSON output
    },
    id: false, // Do not include the default `id` field in JSON output
  }
);

// Define a virtual property `reactionCount` to get the number of reactions for a thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; // Return the length of the thought's reactions array
});

// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;
