import { useEffect, useState, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";

export function useTasks() {
  // data state
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 5, total: 0 });

  // ui state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // query state
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    search: "",
    status: "",
    priority: "",
  });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getTasks(query);
      setTasks(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // actions
  async function addTask(task) {
    await createTask(task);
    fetchTasks();
  }

  async function editTask(id, updates) {
    await updateTask(id, updates);
    fetchTasks();
  }

  async function removeTask(id) {
    await deleteTask(id);
    fetchTasks();
  }

  return {
    tasks,
    meta,
    loading,
    error,
    query,
    setQuery,
    addTask,
    editTask,
    removeTask,
    refetch: fetchTasks,
  };
}
