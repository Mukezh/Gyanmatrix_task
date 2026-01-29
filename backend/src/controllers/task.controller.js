import { validateCreateTask } from "../validators/task.validator.js";
import { createTask as createTaskService } from "../services/task.service.js";

import { getTasks as getTasksService } from "../services/task.service.js";

import { getTaskById as getTaskByIdService } from "../services/task.service.js";

import { validateUpdateTask } from "../validators/task.validator.js";
import { updateTask as updateTaskService } from "../services/task.service.js";

import { deleteTask as deleteTaskService } from "../services/task.service.js";

export function createTask(req, res) {
  const error = validateCreateTask(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const task = createTaskService(req.body);
    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export function getTasks(req, res) {
  try {
    const result = getTasksService({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 5,
      search: req.query.search,
      status: req.query.status,
      priority: req.query.priority,
      sortBy: req.query.sortBy,
      order: req.query.order,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export function getTaskById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  try {
    const task = getTaskByIdService(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export function updateTask(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const error = validateUpdateTask(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const updatedTask = updateTaskService(id, req.body);

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export function deleteTask(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  try {
    const deleted = deleteTaskService(id);

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
