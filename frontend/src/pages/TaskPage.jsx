import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import "./TaskPage.css";

function TasksPage() {
  const {
    tasks,
    loading,
    error,
    meta,
    query,
    setQuery,
    addTask,
    editTask,
    removeTask,
  } = useTasks();

  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="page">
      <div className="container">
        <h1>Task Tracker</h1>

        <TaskForm onCreate={addTask} />

        <div className="filters">
          <input
            className="input"
            placeholder="Search tasks..."
            value={query.search}
            onChange={(e) =>
              setQuery({ ...query, search: e.target.value, page: 1 })
            }
          />
        </div>

        {loading && <p>Loading tasks...</p>}
        {error && <p className="error">{error}</p>}

        <div className="list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={editTask}
              onDelete={() => setDeleteId(task.id)}
            />
          ))}
        </div>

        <Pagination
          page={query.page}
          limit={meta.limit}
          total={meta.total}
          onChange={(page) => setQuery({ ...query, page })}
        />
      </div>

      {deleteId && (
        <Modal onClose={() => setDeleteId(null)}>
          <p>Are you sure you want to delete this task?</p>
          <button
            className="delete"
            onClick={async () => {
              await removeTask(deleteId);
              setDeleteId(null);
            }}
          >
            Delete
          </button>
        </Modal>
      )}
    </div>
  );
}

export default TasksPage;
