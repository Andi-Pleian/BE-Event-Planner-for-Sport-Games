# RESTful API Node Server Boilerplate

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, Swagger and Mongoose.

## Manual Installation

Clone the repo:

```bash
git clone --depth 1 https://github.com/tavistoica/rest-node-express-boilerplate.git
cd rest-node-express-boilerplate
```

Install the dependencies:

```bash
npm install
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Linting](#linting)

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **CI**: continuous integration with [Travis CI](https://travis-ci.org)
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Testing:

```bash
# run all tests
npm test
```

Linting:

```bash
# run ESLint
npm lint
```

## Project Structure

```
src\
 |--bootstrap\      # Classes for adding certain functionality to the server(ex: mongo database connection)
 |--controllers\    # Route controllers (controller layer)
 |--middleware\     # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--util\           # Utility classes and functions
 |--app.js          # Express app
 |--index.js        # App entry point
swagger\            # Swagger files
webpack\            # Webpack files

```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Health routes**:\
`GET /health/` - check service status\

**Todo routes**:\
`GET /todo/` - get all todos\
`POST /todo/` - create a todo\
`DELETE /todo/` - delete all todos\
`GET /todo/:id` - get a particular todo\
`DELETE /todo/:id` - remove a particular todo\

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`).

The error handling middleware sends an error response, which has the following format:

```json
{
  "status": 404,
  "message": "Not found"
  "type": "swagger-error",
  "detail": "Swagger validation failed",
  "placement": "global"
}
```

The app has a utility ProblemError class to which you can attach a response status, detail, placement and a type, and then throw it from anywhere.

For example, if you are trying to get a todo from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
import ProblemError from "../utils/ApiError";
import Todo from "../models/User";

const getTodo = async (id) => {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new ProblemError(404, "not-found", "User not found", "global");
  }
};
```

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://www.npmjs.com/package/eslint-config-standard) with some modifications.

To modify the ESLint configuration, update the `.eslintrc.js` file. To modify the Prettier configuration, update the `.prettierrc.js` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

## Inspirations

- [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate)
- [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)
- [madhums/node-express-mongoose](https://github.com/madhums/node-express-mongoose)
- [kunalkapadia/express-mongoose-es6-rest-api](https://github.com/kunalkapadia/express-mongoose-es6-rest-api)

## License

[MIT](LICENSE)
