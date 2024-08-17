// Import the User model from the User.js file
const User = require('./User');
// Import the Thought model from the Thought.js file
const Thought = require('./Thought');

// Export both the User and Thought models together as an object
// This allows them to be easily imported together in other parts of the application
module.exports = { User, Thought };
