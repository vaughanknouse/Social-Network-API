# NoSQL: Social Network API

![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description \*\*\*

## Table of Contents

- [NoSQL: Social Network API](#nosql-social-network-api)
  - [Description \*\*\*](#description-)
  - [Table of Contents](#table-of-contents)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Screenshots: \*\*\*](#screenshots-)
  - [Tests](#tests)
  - [Links \*\*\*](#links-)
  - [Credits](#credits)
  - [License](#license)
  - [Questions](#questions)

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Technologies Used

- **Node.js**: JavaScript backend runtime environment for building server-side applications.
- **Express.js**: Framework for building web applications and handling routes.
- **MongoDB**: NoSQL database for storing user and thought data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js, providing schema-based data modeling.
- **Nodemon**: Tool for automatically restarting the server during development.
- **Insomnia**: API client for route testing.
- **JavaScript `Date` Object**: For handling and formatting timestamps.

## Features

- **User Management**: Retrieve all users; create, update, and delete users; manage a user's friend list.
- **Thought Management**: Retrieve all thoughts posted by users; create, update, and delete thoughts; manage reactions associated with specific thoughts.
- **Reaction Management**: Retrieve all reactions for a specific thought; add and remove reactions to thoughts.
- **Friend List**: Add and remove friends from a user's friend list.
- **NoSQL Database:** Uses MongoDB for handling large amounts of unstructured data efficiently.

## Installation

To install the NoSQL Social Network API, follow the following steps:

1. Clone the repository to your local machine: `https://github.com/vaughanknouse/Social-Network-API.git`.
2. Navigate to the project directory by typing `cd Social-Network-API` in the terminal.
3. Install the necessary dependencies by typing `npm install` in the command line.
4. Ensure that MongoDB is installed on your machine to initialize the database.
   - If not yet installed, visit the [MongoDB installation guide on The Full-Stack Blog](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb).
5. Ensure that Insomnia is also installed on your machine for API route testing.
   - If not yet installed, visit the [Insomnia download page](https://insomnia.rest/download).

## Usage

Once everything is installed, to use the NoSQL Social Network API, follow the following steps:

1. Seed the database by entering `npm run seed` in the terminal.
2. Start the server by typing `npm start` in the terminal.
3. Run `npm run dev` to have the server automatically restart whenever changes are saved.
4. For API route testing instructions using Insomnia, navigate to the "Tests" section of the README.

### Screenshots: \*\*\*

The following screenshots demonstrate the application's API routes being tested in Insomnia.

**GET route to retrieve all users:**

![Shows GET route to retrieve all users.](assets/images/GET-users-screenshot.png)

**POST route to add a friend to a user's friend list:**

![Shows POST route to add a friend to a user's friend list.](assets/images/POST-friend-screenshot.png)

**POST route to add a reaction to a thought:**

![Shows POST route to add a reaction to a thought.](assets/images/POST-reaction-screenshot.png)

## Tests

Use Insomnia or a similar API client to test the following API routes:

- **Users**

  - GET `/api/users`: Retrieve all users.
  - GET `/api/users/:id`: Retrieve a single user by `_id` along with their associated thoughts and friends.
  - POST `/api/users`: Create a new user.
  - PUT `/api/users/:id`: Update a user by `_id`.
  - DELETE `/api/users/:id`: Delete a user by `_id` and remove their associated thoughts.

- **Friends**

  - POST `/api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
  - DELETE `/api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

- **Thoughts**

  - GET `/api/thoughts`: Retrieve all thoughts.
  - GET `/api/thoughts/:id`: Retrieve a single thought by `_id`.
  - POST `/api/thoughts`: Create a new thought.
  - PUT `/api/thoughts/:id`: Update a thought by `_id`.
  - DELETE `/api/thoughts/:id`: Delete a thought by `_id`.

- **Reactions**

  - POST `/api/thoughts/:thoughtId/reactions`: Create and add a reaction to a thought.
  - DELETE `/api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought by its `_id`.

## Links \*\*\*

**GitHub Repository**: <https://github.com/vaughanknouse/Social-Network-API>

**Walkthrough Video** demonstrating the functionality of the API: \*\*\*

## Credits

Used the following sources as tutorials and guidelines:

[MongoDB documentation](https://www.mongodb.com/docs/manual/)

[Mongoose documentation](https://mongoosejs.com/docs/index.html)

[freeCodeCamp: Introduction to Mongoose for MongoDB
](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)

[GeeksforGeeks Mongoose Tutorial](https://www.geeksforgeeks.org/mongoose-tutorial/)

[ChatGPT](https://chatgpt.com/?oai-dm=1)

[Xpert Learning Assistant](https://bootcampspot.instructure.com/courses/5293/external_tools/313)

## License

This project is licensed under the MIT license. For more information, please visit [this link](https://opensource.org/licenses/MIT).

## Questions

For any questions or feedback, please contact me via email at <vaughanknouse@gmail.com>.

Additionally, you can find me on GitHub at [vaughanknouse](https://github.com/vaughanknouse).
