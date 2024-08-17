// Import the 'Schema' and 'model' functions from the 'mongoose' package
const { Schema, model } = require('mongoose');

// Define the schema for the User model
const userSchema = new Schema(
  {
    // Field for the username
    username: {
      type: String, // Data type is String
      unique: true, // This field must be unique
      required: true, // This field is required
      trim: true, // Removes leading/trailing whitespace
    },
    // Field for the email
    email: {
      type: String, // Data type is String
      required: true, // This field is required
      unique: true, // This field must be unique
      match: [
        // Regex pattern for validating email addresses
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address', // Error message if validation fails
      ],
    },
    // Field for the user's thoughts, which is an array of ObjectIds referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId, // Data type is ObjectId
        ref: 'Thought', // Reference to the Thought model
      },
    ],
    // Field for the user's friends, which is an array of ObjectIds referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId, // Data type is ObjectId
        ref: 'User', // Self-reference to the User model
      },
    ],
  },
  {
    // Options for the schema
    toJSON: {
      virtuals: true, // Enable virtuals when converting to JSON
    },
    id: false, // Disable the virtual 'id' field
  }
);

// Create a virtual property 'friendCount' to get the number of friends for a user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length; // Returns the length of the friends array
});

// Create the User model using the defined schema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
