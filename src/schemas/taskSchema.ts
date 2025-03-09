import { Request, Response, NextFunction } from "express";
import { z } from 'zod';

// Define the task schema
export const taskSchema = z.object({
    title: z.string().min(3, "Task title must be at least 3 characters long."),
    description: z.string().max(1000, "Description can be a maximum of 1000 characters.").optional(),
    status: z.enum(["pending", "in_progress", "completed"]).refine(val => ["pending", "in_progress", "completed"].includes(val), {
        message: "Status must be one of: pending, in_progress, completed",
    }),
    due_date: z.string().datetime("Due date must be a valid datetime string").optional(),
    project_id: z.string().uuid("Project ID must be a valid UUID"),
    user_id: z.string().uuid("User ID must be a valid UUID").optional(), // user_id is optional for unassigned tasks
});

// Validation middleware for the request body
export const validateTask = (req: Request, res: Response, next: NextFunction): void => {
    const result = taskSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json(result.error.format());
        return;
    }
    next(); // Proceed to the next middleware or route handler if validation succeeds
};
