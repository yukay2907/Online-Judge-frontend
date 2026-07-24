# CodeX

A full-stack MERN online judge platform. Users browse coding problems, submit Python solutions, and receive automated verdicts based on execution against predefined test cases.

**Frontend:** [Online-Judge-frontend](https://github.com/yukay2907/Online-Judge-frontend)

**Backend:** [Online-Judge-backend](https://github.com/yukay2907/Online-Judge-backend)

**Deployed Link:** [CodeX](https://codex-frontend-wine.vercel.app/)

## Table of Contents

- [About](#about)
- [Objectives](#objectives)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Code Execution Pipeline](#code-execution-pipeline)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Author](#author)

## About

CodeX is a full-stack online judge platform inspired by coding platforms such as LeetCode and HackerRank. Users can browse coding problems, write Python solutions in the browser, execute code against predefined test cases, and view detailed submission results.

Beyond typical CRUD functionality, CodeX covers the full lifecycle of an online code execution platform — secure authentication, dynamic code execution, and automated verdict generation — with an emphasis on scalable backend architecture, secure auth, and clean API design.

## Objectives

- Build a production-style MERN application
- Design secure JWT-based authentication
- Execute user-submitted Python code safely
- Evaluate solutions against predefined test cases
- Maintain submission history
- Demonstrate scalable, layered backend architecture
- Practice frontend state management with React Context

## Features

**Authentication**

- Registration and secure login
- JWT authentication with HTTP-only cookie sessions
- Protected routes and persistent authentication
- Logout functionality

**Problem Management**

- Browse coding problems with difficulty classification
- Detailed problem statements with sample inputs/outputs

**Online Judge**

- Python code execution
- Automatic test case evaluation
- Verdicts: Accepted, Wrong Answer, Runtime Error, Time Limit Exceeded
- Execution status tracking

**Submission History**

- Verdict, execution status, runtime, memory usage, and timestamp per submission

**User Experience**

- Responsive, modern interface
- Loading states and error handling
- Protected navigation and consistent UI components

## Tech Stack

| Layer          | Technologies                                                                       |
| -------------- | ---------------------------------------------------------------------------------- |
| Frontend       | React, Vite, React Router, Axios, Tailwind CSS                                     |
| Backend        | Node.js, Express.js, REST API, layered architecture (Controller → Service → Model) |
| Database       | MongoDB, Mongoose                                                                  |
| Authentication | JWT, HTTP-only cookies, authorization middleware                                   |
| Code Execution | Python, Node.js child processes, dynamic file generation                           |
| Tools          | Git, GitHub, Postman, VS Code                                                      |

## Architecture

```
                     React + Vite (Pages, Components, Auth Context)
                                      │
                                  Axios HTTP
                                      │
                                      ▼
                        Express.js REST API
        (Routes → Controllers → Middleware → Services)
                                      │
                     ┌────────────────┴────────────────┐
                     ▼                                 ▼
          Python Execution Engine                MongoDB Database
            (Child Process API)                     (Mongoose)
                     │
                     ▼
              Verdict Generation
```

**Backend layers:**

| Layer       | Responsibility                            |
| ----------- | ----------------------------------------- |
| Routes      | Define API endpoints                      |
| Controllers | Handle HTTP requests and responses        |
| Services    | Business logic (e.g. code execution)      |
| Models      | Database interaction                      |
| Middleware  | Authentication, authorization, validation |
| Utils       | Shared helper functions                   |

## Code Execution Pipeline

1. User submits code from the frontend (POST request)
2. Submission controller stores the submission in MongoDB
3. A temporary workspace is created and a Python file generated
4. A child process executes the code
5. Output is captured and compared against expected output
6. A verdict is generated and the submission is updated
7. The result is returned to the frontend

## Project Structure

```
CodeX
├── backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── temp/
│   ├── app.js
│   └── server.js
│
├── frontend
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

## Getting Started

### Prerequisites

| Software | Version        |
| -------- | -------------- |
| Node.js  | 18+            |
| npm      | 9+             |
| Python   | 3.x            |
| MongoDB  | Local or Atlas |
| Git      | Latest         |

### Backend Setup

```bash
git clone https://github.com/yukay2907/Online-Judge-backend.git
cd Online-Judge-backend
npm install
```

Create a `.env` file (see [Environment Variables](#environment-variables)), then:

```bash
npm run dev
```

### Frontend Setup

```bash
git clone https://github.com/yukay2907/Online-Judge-frontend.git
cd Online-Judge-frontend
npm install
```

Create a `.env` file (see [Environment Variables](#environment-variables)), then:

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Environment Variables

**Backend**

| Variable              | Description               |
| --------------------- | ------------------------- |
| `PORT`                | Backend port              |
| `MONGODB_URI`         | MongoDB connection string |
| `CORS_ORIGIN`         | Allowed frontend URL      |
| `ACCESS_TOKEN_SECRET` | JWT secret                |
| `PYTHON_EXECUTABLE`   | Python executable path    |

**Frontend**

| Variable       | Description      |
| -------------- | ---------------- |
| `VITE_API_URL` | Backend base URL |

## API Endpoints

**Authentication**

| Method | Endpoint                 | Description      |
| ------ | ------------------------ | ---------------- |
| POST   | `/api/auth/register`     | Register user    |
| POST   | `/api/auth/login`        | Login user       |
| POST   | `/api/auth/logout`       | Logout           |
| GET    | `/api/auth/current-user` | Get current user |

**Problems**

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/problems`     | Get all problems       |
| GET    | `/api/problems/:id` | Get single problem     |
| POST   | `/api/problems`     | Create problem (admin) |
| PUT    | `/api/problems/:id` | Update problem (admin) |
| DELETE | `/api/problems/:id` | Delete problem (admin) |

**Submissions**

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | `/api/submissions` | Submit solution        |
| GET    | `/api/submissions` | Get submission history |

## Security

- JWT-based authentication with HTTP-only cookies
- Protected API routes and role-based authorization (admin-only problem management)
- User-specific submission history access
- Backend validation: required fields, MongoDB ObjectId checks, centralized error handling
- Code execution safeguards: temporary workspace creation, execution timeout, automatic cleanup of generated files, output comparison against predefined test cases

## Testing

Manually tested for:

- User registration and duplicate-user validation
- Login, logout, and persistent authentication
- Protected routes
- Problem listing and problem details
- Accepted solutions, wrong answers, and runtime errors
- Submission history

## Deployment

| Component | Platform      |
| --------- | ------------- |
| Frontend  | Vercel        |
| Backend   | Render        |
| Database  | MongoDB Atlas |

Live links will be added once hosted.

## Future Improvements

- Monaco code editor
- Docker-based code sandboxing
- Multiple programming language support
- Hidden test cases

## Author

**Utkarsh Kashyap**

GitHub: [yukay2907](https://github.com/yukay2907)

LinkedIn: [Utkarsh Kashyap](https://www.linkedin.com/in/utkarsh-kashyap-910439254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

Email: yukay2907@gmail.com
