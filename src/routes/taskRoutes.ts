import express from "express";

import { validateIdParam } from '@/schemas/commonSchema';
import { validateTask } from "@/schemas/taskSchema"; // Assuming you have a schema to validate task data
import { taskController } from "@/controllers/taskController";

export const taskRoutes = express.Router();

// Create a new task with validation
taskRoutes.post(
    "/",
    validateTask, // Assuming you have a schema to validate task data
    taskController.createTask
);

// Update an existing task with validation
taskRoutes.put(
    "/:id",
    validateIdParam, // Validation for the task ID in the URL
    validateTask, // Validate the updated task data
    taskController.updateTask
);

// Get all tasks (no validation needed)
taskRoutes.get(
    "/",
    taskController.getAllTasks
);

// Get task by ID with validation of the `id` parameter
taskRoutes.get(
    "/:id",
    validateIdParam, // Validate task ID
    taskController.getTaskById
);

// Delete a task with validation of the `id` parameter
taskRoutes.delete(
    "/:id",
    validateIdParam, // Validate task ID
    taskController.deleteTask
);

// Get tasks by project ID
taskRoutes.get(
    "/project/:projectId",
    validateIdParam, // Validate project ID
    taskController.getTasksByProjectId
);

// Get tasks by user ID
taskRoutes.get(
    "/user/:userId",
    validateIdParam, // Validate user ID
    taskController.getTasksByUserId
);
