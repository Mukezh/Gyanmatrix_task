# Task Tracker

A full-stack task management application built with React and Node.js, featuring a clean architecture and modern development practices.

## Overview

Task Tracker is a simple yet powerful task management application that allows users to create, read, update, and delete tasks with features like pagination, search, filtering, and sorting. The application follows RESTful API design principles and maintains a clean separation of concerns throughout the codebase.

## Features

### Backend
- **RESTful API** built with Express.js
- **SQLite database** for lightweight, file-based persistence
- **CRUD operations** for task management
- **Advanced filtering** with pagination, search, and sorting
- **Input validation** and proper HTTP status codes
- **Clean architecture** with separation of routes, controllers, services, and validators

### Frontend
- **React + Vite** for fast development and optimized builds
- **Task management** with full CRUD functionality
- **Search and pagination** for easy navigation
- **Delete confirmation modal** for safe operations
- **Loading, error, and empty states** for better UX
- **Responsive design** that works on all devices
- **Modular architecture** with separated pages, components, hooks, and API layer

## Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── routes/           # API route definitions
│   │   ├── services/         # Business logic
│   │   ├── validators/       # Input validation
│   │   ├── db/               # Database configuration
│   │   └── server.js         # Application entry point
│   ├── data/                 # SQLite database file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/              # API client functions
│   │   ├── components/       # Reusable React components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   ├── test/             # Test files
│   │   └── main.jsx          # Application entry point
│   ├── vite.config.js        # Vite configuration
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node src/server.js
   ```

The backend server will start on:
```
http://localhost:3000
```

The SQLite database file will be automatically created at:
```
backend/data/tasks.db
```

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The frontend application will start on:
```
http://localhost:5173
```

> **Note:** The frontend uses a Vite proxy to communicate with the backend via the `/api` endpoint.

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (supports pagination, search, filtering, sorting) |
| GET | `/api/tasks/:id` | Get a specific task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Query Parameters

**GET /api/tasks** supports the following query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search term for task title/description
- `status` - Filter by task status
- `sort` - Sort field (e.g., createdAt, title)
- `order` - Sort order (asc/desc)

## Development

### Running in Development Mode

**Backend:**
```bash
cd backend
node src/server.js
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

The production-ready files will be generated in the `frontend/dist` directory.

## Technologies Used

### Backend
- **Express.js** - Web framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server

## Environment Variables

### Backend
Create a `.env` file in the backend directory (optional):
```env
PORT=3000
DATABASE_PATH=./data/tasks.db
```

### Frontend
Create a `.env` file in the frontend directory (optional):
```env
VITE_API_URL=http://localhost:3000
```
