import express from "express";
import cors from "cors";
import { runMigrations } from "./db/migrate.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

runMigrations();

app.use("/api/tasks", taskRoutes);

export default app;
