## Task Tracker – Full Stack Assignment

A simple Task Tracker application built with a React frontend and a Node.js (Express) backend, using SQLite for persistence.


### Features
## Backend

RESTful APIs built with Express

SQLite database (file-based)

Create, read, update, and delete tasks

Pagination, search, filtering, and sorting

Input validation and proper HTTP status codes

Clean separation of routes, controllers, services, and validators

## Frontend

React with Vite

Task list with pagination and search

Create, edit, and delete tasks

Delete confirmation modal

Loading, error, and empty states

Responsive layout

Clean separation of pages, components, hooks, and API layer

## Project Structure

project-root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   └── db/
│   ├── data/              # SQLite database file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── test/
│   ├── vite.config.js
│   └── package.json
│
└── README.md


Prerequisites

Node.js 18 or higher

npm

Backend Setup
1. Navigate to the backend directory
cd backend

2. Install dependencies
npm install

3. Start the server
node src/server.js


The backend will run on:

http://localhost:3000


The SQLite database file is automatically created at:

backend/data/tasks.db

Frontend Setup
1. Navigate to the frontend directory
cd frontend

2. Install dependencies
npm install

3. Start the development server
npm run dev


The frontend will run on:

http://localhost:5173


The frontend uses a Vite proxy to communicate with the backend via /api.
