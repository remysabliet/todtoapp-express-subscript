import { Request, Response, NextFunction } from "express";

import { NotFoundError, ConflictError } from "@/errors/customErrors";
import { taskServices } from "@/services/taskServices";

export const taskController = {
    // Get all tasks
    getAllTasks: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tasks = await taskServices.getAllTasks();
            res.json(tasks);
        } catch (error) {
            next(error);
        }
    },

    // Get a task by ID
    getTaskById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const task = await taskServices.getTaskById(id);
            if (!task) {
                throw new NotFoundError("Task not found");
            }
            res.json(task);
        } catch (error) {
            next(error);
        }
    },

    // Create a new task
    createTask: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const task = await taskServices.createTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            if (error instanceof ConflictError) {
                return next(error);
            }
            next(error);
        }
    },

    // Update an existing task
    updateTask: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const updatedTask = await taskServices.updateTask(id, req.body);
            if (!updatedTask) {
                throw new NotFoundError("Task not found");
            }
            res.json(updatedTask);
        } catch (error) {
            next(error);
        }
    },

    // Delete a task
    deleteTask: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const deletedCount = await taskServices.deleteTask(id);
            if (!deletedCount) {
                throw new NotFoundError("Task not found");
            }
            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            next(error);
        }
    },

    // Get tasks by project ID
    getTasksByProjectId: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { projectId } = req.params;
            const tasks = await taskServices.getTasksByProjectId(projectId);
            res.json(tasks);
        } catch (error) {
            next(error);
        }
    },

    // Get tasks by user ID
    getTasksByUserId: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.params;
            const tasks = await taskServices.getTasksByUserId(userId);
            res.json(tasks);
        } catch (error) {
            next(error);
        }
    }
};
