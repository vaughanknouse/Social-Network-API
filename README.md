# NoSQL: Social Network API <!-- omit in toc -->

![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description <!-- omit in toc -->

In response to the growing demand for scalable and flexible backend solutions in social media platforms, this week’s challenge from the UT Austin Coding Boot Camp involves building a Social Network API from scratch using NoSQL technology. Built with Express.js, MongoDB, and Mongoose ODM, this API allows users to share thoughts, react to posts, and manage friend lists, offering robust support for complex relationships and dynamic data interactions.

Designed with RESTful principles, this API supports full CRUD operations for users, thoughts, reactions, and friendships, efficiently managing large volumes of unstructured data. Users can create accounts, post thoughts, add friends, and interact with other users’ content. By leveraging Mongoose ODM and MongoDB, the API adapts to the fluid nature of social interactions while ensuring consistent data retrieval and updates through asynchronous operations.

The motivation behind this project was to address the complexities of managing large volumes of unstructured data in a social networking context, particularly real-time interactions and diverse content types essential for modern social media. The NoSQL Social Network API meets these challenges, streamlining the management of user data, posts, reactions, and connections.

Overall, as a foundational tool for building scalable and efficient social networking applications, this API handles the complexities of user data, interactions, and connections typical of modern social networks.

## Table of Contents <!-- omit in toc -->

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Screenshots:](#screenshots)
- [Tests](#tests)
- [Links](#links)
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

- **Node.js**: Provides the server-side environment to run JavaScript code, enabling the development of scalable and high-performance applications.
- **Express.js**: A fast, minimalist web framework for Node.js, used to create and manage routes for API endpoints and handle HTTP requests/responses efficiently.
- **MongoDB**: A flexible NoSQL database used to store and manage user, thought, and reaction data in a document-oriented format.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB that facilitates data modeling, schema validation, and seamless interaction with the MongoDB database.
- **Nodemon**: A development tool that automatically restarts the Node.js server when file changes are detected, improving development workflow and efficiency.
- **Moment.js**: A popular JavaScript library used for parsing, validating, manipulating, and formatting dates and times, ensuring accurate and consistent handling of timestamp data throughout the application.
- **Insomnia**: A powerful API client used to test and interact with the API endpoints, allowing developers to send HTTP requests and view responses in various formats.
- **MongoDB Compass**: A GUI tool for MongoDB that allows developers to visually explore and manage data, run queries, and optimize database performance.

## Features

- **User Management**:

  - Provides comprehensive control over user accounts, including the ability to retrieve a list of all users, create new users, update existing user details, and delete users from the database.
  - Includes friend list management, allowing users to build, maintain, and manage their list of friends, reflecting real-world social networks.

- **Thought Management**:

  - Enables users to share their thoughts with the community by creating, updating, or deleting thoughts.
  - Offers the ability to retrieve thoughts posted by any user, facilitating the viewing and interaction with user-generated content.

- **Reaction Management**:

  - Allows users to engage with specific thoughts by adding reactions, similar to likes or comments in a typical social network.
  - Reactions can be added or removed, providing dynamic interaction between users.

- **Friend List Management**:

  - Users can enhance their social connections by adding friends to their friend list, enabling easy access to friends' thoughts and interactions.
  - Friendships can be managed by adding or removing friends from a user's list, keeping the network relevant and up-to-date.

- **NoSQL Database**:

  - Leverages MongoDB to handle large amounts of unstructured data efficiently, providing flexibility in data storage and retrieval.
  - The schema-less nature of MongoDB allows for rapid development and scalability, essential for growing social networks.

## Installation

To install the NoSQL Social Network API, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/vaughanknouse/Social-Network-API.git
   ```

2. **Install Node.js**: Ensure that the current version of Node.js is installed on your machine.

3. **Navigate to the Project Directory**:

   ```bash
    cd Social-Network-API
   ```

4. **Install Dependencies**:

   ```bash
   npm install
   ```

5. **Install MongoDB**: Ensure that MongoDB is installed on your machine to initialize the database. If not, refer to the [MongoDB installation guide on The Full-Stack Blog](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb).
6. **Install Insomnia**: Ensure that Insomnia or a similar API client for route testing is also installed on your machine. If not yet installed, download Insomnia from the [Insomnia download page](https://insomnia.rest/download).

## Usage

After completing the installation, follow these steps to use the NoSQL Social Network API:

1. **Start the server**: Invoke the application using the following command:

   ```bash
    npm start
   ```

   > [!NOTE]
   > If you want the server to automatically restart whenever changes are saved, use the command `npm run dev` instead.

2. **Verify Database Connection**: When you see the message `"Mongoose has successfully connected to the MongoDB database. API server running on port 3001!"`, open MongoDB Compass and connect to the MongoDB URI `mongodb://localhost:27017`. Verify that the `users` and `thoughts` Mongoose models are synced with the `socialNetworkDB` database.

3. **Create Data**: As the project does not include seed data, use Insomnia to create data for `users` and `thoughts` manually.

4. **API Route Testing**: For detailed instructions on testing API routes using Insomnia, refer to the "Tests" section of the `README.md`.

### Screenshots:

The following screenshots demonstrate the Mongoose models synced with the MongoDB database in MongoDB Compass and examples of the API routes being tested in Insomnia:

**MongoDB Compass showing the synced `socialmediaDB` database with `users` and `thoughts` models:**

![Shows Mongoose models synced with the MongoDB database in MongoDB Compass.](assets/images/compass-database.png)

**MongoDB Compass showing `users` model data within the `socialmediaDB` database:**

![Shows users model within the database in MongoDB Compass.](assets/images/compass-users.png)

**MongoDB Compass showing `thoughts` model data within the `socialmediaDB` database:**

![Shows thoughts model within the database in MongoDB Compass.](assets/images/compass-thoughts.png)

**GET route to retrieve all users:**

![Shows GET route to retrieve all users.](assets/images/GET-users.png)

**POST route to create a new user:**

![Shows POST route to create a new user.](assets/images/POST-user.png)

**GET route to retrieve all thoughts:**

![Shows GET route to retrieve all thoughts.](assets/images/GET-thoughts.png)

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

## Links

GitHub Repository: <https://github.com/vaughanknouse/Social-Network-API>

Walkthrough Video: <https://drive.google.com/file/d/105pVmlPufGvbNxV1hqa1WR7tMHdrwhUx/view?usp=sharing>

## Credits

Used the following sources as tutorials and guidelines:

[MongoDB documentation](https://www.mongodb.com/docs/manual/)

[Mongoose documentation](https://mongoosejs.com/docs/index.html)

[Moment.js documentation](https://momentjs.com/)

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
