
import type { Task } from "T/task";

import { ConflictError, DB_ERRORS, NotFoundError } from "@/errors";
import { taskModel, projectModel, userModel } from "@/models";

export class TaskService {
    // Get all tasks
    async getAllTasks(): Promise<Task[]> {
        return taskModel.getAllTasks();
    }

    // Get a task by ID
    async getTaskById(id: string): Promise<Task | null> {
        const task = await taskModel.getTaskById(id);
        if (!task) {
            throw new NotFoundError("Task not found");
        }
        return task;
    }

    // Create a new task
    async createTask(task: Task): Promise<Task> {
        try {
            // Check if the project exists
            const projectExists = await projectModel.getProjectById(task.project_id);
            if (!projectExists) {
                throw new NotFoundError("Project not found.");
            }

            // Check if the user exists (if assigned to a user)
            if (task.user_id) {
                const userExists = await userModel.getUserById(task.user_id);
                if (!userExists) {
                    throw new NotFoundError("Assigned user not found.");
                }
            }

            // Attempt to create the new task
            return await taskModel.createTask(task);
        } catch (error: any) {
            // Handle unique violation or other database errors
            if (error.code === DB_ERRORS.UNIQUE_VIOLATION) {
                throw new ConflictError("A task with this title already exists.");
            }
            throw error;
        }
    }

    // Update an existing task
    async updateTask(id: string, task: Task): Promise<Task | null> {
        try {
            // Check if the task exists
            const existingTask = await taskModel.getTaskById(id);
            if (!existingTask) {
                throw new NotFoundError("Task not found.");
            }

            // Check if the project exists
            const projectExists = await projectModel.getProjectById(task.project_id);
            if (!projectExists) {
                throw new NotFoundError("Project not found.");
            }

            // Check if the user exists (if assigned to a user)
            if (task.user_id) {
                const userExists = await userModel.getUserById(task.user_id);
                if (!userExists) {
                    throw new NotFoundError("Assigned user not found.");
                }
            }

            // Proceed to update the task
            return await taskModel.updateTask(id, task);
        } catch (error: any) {
            // Handle unique violation or other database errors
            if (error.code === DB_ERRORS.UNIQUE_VIOLATION) {
                throw new ConflictError("A task with this title already exists.");
            }
            throw error;
        }
    }

    // Delete a task
    async deleteTask(id: string): Promise<number> {
        const deletedCount = await taskModel.deleteTask(id);
        if (!deletedCount) {
            throw new NotFoundError("Task not found");
        }
        return deletedCount;
    }

    // Find tasks by project ID
    async getTasksByProjectId(projectId: string): Promise<Task[]> {
        const tasks = await taskModel.findByProjectId(projectId);
        if (!tasks || tasks.length === 0) {
            throw new NotFoundError("No tasks found for this project.");
        }
        return tasks;
    }

    // Find tasks by user ID (assigned tasks)
    async getTasksByUserId(userId: string): Promise<Task[]> {
        const tasks = await taskModel.findByUserId(userId);
        if (!tasks || tasks.length === 0) {
            throw new NotFoundError("No tasks found for this user.");
        }
        return tasks;
    }
}

export const taskServices = new TaskService();
