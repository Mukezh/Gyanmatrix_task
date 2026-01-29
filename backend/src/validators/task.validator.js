const VALID_STATUS = ["todo", "in_progress", "done"];
const VALID_PRIORITY = ["low", "medium", "high"];

export function validateCreateTask(body) {
  const { title, status, priority } = body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return "Title is required";
  }

  if (!VALID_STATUS.includes(status)) {
    return "Invalid status value";
  }

  if (!VALID_PRIORITY.includes(priority)) {
    return "Invalid priority value";
  }

  return null;
}

export function validateUpdateTask(body) {
  const { title, description, status, priority } = body;

  if (
    title === undefined &&
    description === undefined &&
    status === undefined &&
    priority === undefined
  ) {
    return "At least one field must be provided";
  }

  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    return "Invalid title";
  }

  if (status !== undefined && !VALID_STATUS.includes(status)) {
    return "Invalid status value";
  }

  if (priority !== undefined && !VALID_PRIORITY.includes(priority)) {
    return "Invalid priority value";
  }

  return null;
}
