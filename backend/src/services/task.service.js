import db from "../db/index.js";

export function createTask({ title, description, status, priority }) {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, status, priority)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(title, description || null, status, priority);

  return db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);
}

export function getTasks({
  page = 1,
  limit = 5,
  search,
  status,
  priority,
  sortBy = "created_at",
  order = "desc",
}) {
  const offset = (page - 1) * limit;

  const conditions = [];
  const params = [];

  if (search) {
    conditions.push("(title LIKE ? OR description LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }

  if (status) {
    conditions.push("status = ?");
    params.push(status);
  }

  if (priority) {
    conditions.push("priority = ?");
    params.push(priority);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const orderBy = ["created_at", "priority", "status"].includes(sortBy)
    ? sortBy
    : "created_at";

  const sortOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";

  const dataQuery = `
    SELECT * FROM tasks
    ${whereClause}
    ORDER BY ${orderBy} ${sortOrder}
    LIMIT ? OFFSET ?
  `;

  const countQuery = `
    SELECT COUNT(*) as total
    FROM tasks
    ${whereClause}
  `;

  const data = db.prepare(dataQuery).all(...params, limit, offset);
  const total = db.prepare(countQuery).get(...params).total;

  return {
    data,
    meta: {
      page,
      limit,
      total,
    },
  };
}

export function getTaskById(id) {
  return db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
}

export function updateTask(id, fields) {
  const updates = [];
  const params = [];

  for (const [key, value] of Object.entries(fields)) {
    updates.push(`${key} = ?`);
    params.push(value);
  }

  updates.push("updated_at = CURRENT_TIMESTAMP");

  const query = `
    UPDATE tasks
    SET ${updates.join(", ")}
    WHERE id = ?
  `;

  const result = db.prepare(query).run(...params, id);

  if (result.changes === 0) {
    return null;
  }

  return db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
}

export function deleteTask(id) {
  const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

  return result.changes > 0;
}
