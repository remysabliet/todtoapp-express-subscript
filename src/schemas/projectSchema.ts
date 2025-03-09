import { Request, Response, NextFunction } from "express";
import { z } from 'zod';

// Define the project schema
export const projectSchema = z.object({
    name: z.string().min(3, "Project name must be at least 3 characters long."),
    description: z.string().max(500, "Description can be a maximum of 500 characters."),
    owner_id: z.string().uuid("Owner ID must be a valid UUID"),
});

// Validation middleware for the request body
export const validateProject = (req: Request, res: Response, next: NextFunction): void => {
    const result = projectSchema.safeParse(req.body);
    if (!result.success) {

        res.status(400).json(result.error.format());
        return;
    }
    next(); // Proceed to the next middleware or route handler if validation succeeds
};
