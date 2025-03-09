import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Define the user schema
export const userSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8),
});

// Validation middleware for the request body
export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        // Respond with an error and ensure the middleware terminates here
        res.status(400).json(result.error.format());
        return; // Explicitly return to stop further execution
    }
    next();
};

