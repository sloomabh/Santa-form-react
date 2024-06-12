# SANTA APP

## Table of Contents

1. [Project Overview](#project-overview)
2. [Explanation of Directories and Files](#explanation-of-directories-and-files)
3. [Packages Used](#packages-used)
4. [How to Run the Project](#how-to-run-the-project)
5. [How to Test the Frontend](#how-to-run-the-test)
6. [Conclusion](#conclusion)

## Project Overview

The Santa App is a web application that allows users to send their Christmas wishes to Santa. The project is divided into two main parts: frontend and backend. The frontend is built using React and TypeScript, while the backend is built using Node.js and Express. The frontend and backend are separated into different directories to follow the MVC (Model-View-Controller) pattern in the backend and a component-based architecture in the frontend.

### Backend

The backend follows the MVC pattern:

- **Models**: Handles data logic and represents the data.
- **Views**: Handles the presentation logic (in this case, EJS templates).
- **Controllers**: Handles the application logic and user input.

### Frontend

The frontend is organized into:

- **Pages**: Represent different views or screens of the application.
- **Components**: Reusable UI elements.
- **Utils**: Utility functions.
- \***\*tests\*\***: testing components.

## Explanation of Directories and Files

### Backend

- `backend/.env`: Environment variables for the backend.
- `backend/package.json`: Backend dependencies and scripts.
- `backend/server.js`: Entry point for the backend server.
- `backend/controllers/`: Contains the controller logic.
- `backend/db/`: Contains the pending request.
- `backend/public/`: Public assets.
- `backend/routes/`: Defines application routes.
- `backend/utils/`: Utility functions for the backend.
- `backend/views/`: EJS templates for emails.

### Frontend

- `frontend/.babelrc`: Babel configuration.
- `frontend/index.html`: Main HTML file for the frontend.
- `frontend/jest.config.js`: Jest configuration for testing.
- `frontend/package.json`: Frontend dependencies and scripts.
- `frontend/tsconfig.json`: TypeScript configuration.
- `frontend/vite.config.ts`: Vite configuration for the frontend to communicate with backend server
- `frontend/src/`: Source files for the frontend.
  - `frontend/src/__tests__/`: Contains test files.
  - `frontend/src/components/`: Contains React components.
  - `frontend/src/pages/`: Contains page components.
  - `frontend/src/styles/`: Contains CSS styles.
  - `frontend/src/utils/`: Contains utility functions.

## Packages Used

### Backend

- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `nodemon`: Tool that helps develop node.js based applications by automatically restarting the node application when file changes are detected.
- `morgan`: HTTP request logger middleware for Node.js.
- `body-parser`: Node.js body parsing middleware.
- `ejs`: Embedded JavaScript templates for generating HTML markup with plain JavaScript.

### Frontend

- `react-router-dom`: DOM bindings for React Router.
- `axios`: Promise-based HTTP client for the browser and Node.js. Used for making HTTP requests from the backend server to external APIs or services.
- `@testing-library/react`: Simple and complete React DOM testing utilities that encourage good testing practices.
- `@testing-library/jest-dom`: Custom jest matchers to test the state of the DOM.

### Root (Concurrently)

- `concurrently`: Utility to run multiple commands concurrently. Used in the root package to run both backend and frontend servers simultaneously during development. This enables developers to start both the backend and frontend servers with a single command, enhancing the development workflow by facilitating testing and debugging of both components concurrently.

## How to Run the Project

1.  Clone or download the repository from GitHub: https://github.com/sloomabh/Santa-form-react

2.  Install project dependencies for both frontend and backend:

Run the following commands

```sh
npm install
cd frontend && npm install && cd ../backend && npm install && cd ..
```

3.  Create a `.env` file with `ETHEREAL_USER` and `ETHEREAL_PASS` for Nodemailer setup (you can use the public account credentialin this project)

4.  After the installation is complete, start the development server by running the following command:

```sh
npm run dev

```

5. **Access the App**: Open `http://localhost:3000` in your web browser.

## How to Run the Project

1.  Navigate to the `frontend` directory

```sh
cd frontend
```

2.  Run the tests

```sh
npm test
```

## Conclusion

The Santa App is a full-stack web application that demonstrates the use of React and TypeScript on the frontend, and Node.js and Express on the backend. By splitting the project into frontend and backend directories, we maintain a clear separation of concerns, making the application more modular, maintainable, and scalable. The use of MVC pattern in the backend and component-based architecture in the frontend ensures a clean and organized codebase.
