import { useState } from "react";

function TaskItem({ task, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
  });

  async function save() {
    if (!editForm.title.trim()) return;
    await onEdit(task.id, editForm);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="card edit-card">
        <input
          className="input"
          value={editForm.title}
          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
        />

        <textarea
          className="textarea"
          value={editForm.description}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              description: e.target.value,
            })
          }
        />

        <div className="form-row">
          <select
            className="select"
            value={editForm.status}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                status: e.target.value,
              })
            }
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            className="select"
            value={editForm.priority}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                priority: e.target.value,
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="edit-actions">
          <button className="primary" onClick={save}>
            Save
          </button>
          <button className="secondary" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>{task.title}</h3>
        <div className="actions">
          <button onClick={() => setEditing(true)}>Edit</button>
          <button className="delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>

      {task.description && <p className="description">{task.description}</p>}

      <div className="meta">
        <span>Status: {task.status}</span>
        <span>Priority: {task.priority}</span>
      </div>
    </div>
  );
}

export default TaskItem;
