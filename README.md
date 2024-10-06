# CarWorks Backend

This is the backend service for the **CarWorks** project. It uses Node.js, Express, and MongoDB for managing car-related data and user roles with role-based access control (RBAC). The project is set up as an API server, with secure authentication using JWT and password hashing using bcryptjs.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [License](#license)

## Technologies Used
- Node.js
- Express
- MongoDB (via Mongoose)
- JWT (JSON Web Token) for authentication
- bcryptjs for password hashing
- dotenv for environment variable management
- cors for handling Cross-Origin Resource Sharing
- body-parser for parsing request bodies

## Prerequisites
Before setting up and running this project, ensure you have the following installed on your local machine:
- **Node.js** (v16+)
- **MongoDB** (either locally installed or a cloud MongoDB service like MongoDB Atlas)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd carworks
   ```

2. **Install dependencies**:
   Run the following command to install all project dependencies (both `dependencies` and `devDependencies`):
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Create a `.env` file in the root of the project.
   - Add the required environment variables (detailed in the [Environment Variables](#environment-variables) section below).

4. **Set up MongoDB**:
   - If using MongoDB locally, make sure your MongoDB server is running.
   - If using MongoDB Atlas, get the connection string for your MongoDB instance.

## Running the Application

1. **For development (with auto-reload)**:
   Use the following command to start the server with Nodemon, which will automatically reload the server when file changes are detected:
   ```bash
   npm run dev
   ```

2. **For production**:
   Use the following command to start the server:
   ```bash
   npm start
   ```

## Environment Variables

You will need to set up the following environment variables in a `.env` file at the root of the project:

```env
# MongoDB connection string
MONGO_URI=<Your MongoDB Connection String>

# JWT Secret for authentication
JWT_SECRET=<Your JWT Secret Key>

# Server port (optional, default is 5000)
PORT=5000
```

### Example `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/carworks
JWT_SECRET=mysecretkey123
PORT=5000
```

## Project Structure

Here is a basic outline of the project structure:

```
carworks/
│
├── server.js          # Entry point for the backend application
├── models/            # Mongoose models (e.g., User, Car, PCF, BOM)
├── routes/            # API route handlers (e.g., auth routes, car routes)
├── controllers/       # Logic for handling requests and responses
├── middleware/        # Authentication and other middleware
├── config/            # Configuration files (e.g., database connection)
├── .env               # Environment variables (not included in the repo)
├── package.json       # Project metadata and dependencies
└── README.md          # Documentation for the project
```

## Scripts

The following scripts are available in the `package.json`:

- **`npm start`**: Runs the server in production mode.
- **`npm run dev`**: Runs the server with Nodemon for auto-reloading during development.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.
