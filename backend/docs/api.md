# API Documentation

Overview
- Base URL: http://localhost:3000
- Version: 1.0.0
- Tech: Express 5, better-sqlite3
- Global middleware: CORS, JSON body parsing
- Routes mount point: /api/tasks
- Auth: None
- Content-Type: application/json

Task object
- Fields:
  - id: integer
  - title: string
  - description: string|null
  - status: enum [todo, in_progress, done]
  - priority: enum [low, medium, high]
  - created_at: string (ISO datetime)
  - updated_at: string (ISO datetime)

Endpoints

1) POST /api/tasks
- Purpose: Create a task.
- Body:
  - title: string, required, non-empty
  - description: string, optional
  - status: enum [todo, in_progress, done], required
  - priority: enum [low, medium, high], required
- Responses:
  - 201: Task
  - 400: { error: string } on validation failure
  - 500: { error: "Internal server error" }

Example
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write docs","description":"Create API docs","status":"in_progress","priority":"high"}'
```

2) GET /api/tasks
- Purpose: List tasks with filtering, sorting, and pagination.
- Query params:
  - page: integer, default 1
  - limit: integer, default 5
  - search: string (matches title or description)
  - status: enum [todo, in_progress, done]
  - priority: enum [low, medium, high]
  - sortBy: enum [created_at, priority, status], default created_at
  - order: enum [asc, desc], default desc
- Responses:
  - 200: { data: Task[], meta: { page: number, limit: number, total: number } }
  - 500: { error: "Internal server error" }

Example
```bash
curl "http://localhost:3000/api/tasks?search=docs&status=in_progress&sortBy=priority&order=asc&page=1&limit=10"
```

3) GET /api/tasks/:id
- Purpose: Retrieve a task by id.
- Path params:
  - id: integer
- Responses:
  - 200: Task
  - 400: { error: "Invalid task id" }
  - 404: { error: "Task not found" }
  - 500: { error: "Internal server error" }

Example
```bash
curl http://localhost:3000/api/tasks/1
```

4) PATCH /api/tasks/:id
- Purpose: Update one or more fields of a task.
- Path params:
  - id: integer
- Body: At least one field required from:
  - title: string, non-empty
  - description: string
  - status: enum [todo, in_progress, done]
  - priority: enum [low, medium, high]
- Responses:
  - 200: Task (after update)
  - 400: { error: "Invalid task id" | validation message }
  - 404: { error: "Task not found" }
  - 500: { error: "Internal server error" }

Example
```bash
curl -X PATCH http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"done","priority":"medium"}'
```

5) DELETE /api/tasks/:id
- Purpose: Delete a task by id.
- Path params:
  - id: integer
- Responses:
  - 204: No Content
  - 400: { error: "Invalid task id" }
  - 404: { error: "Task not found" }
  - 500: { error: "Internal server error" }

Example
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

Notes and behaviors
- Pagination: limit and page apply after filters; meta.total is total matching rows.
- Sorting: Only created_at, priority, status are accepted; others fallback to created_at.
- Validation errors: create and update validate per src/validators/task.validator.js.
