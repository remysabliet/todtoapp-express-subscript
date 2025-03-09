import { z } from "zod";
import { Request, Response, NextFunction } from "express";

// Validation for the `id` parameter (UUID format)
export const validateIdParam = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const result = z.object({
        id: z.string().uuid(),
    }).safeParse(req.params);

    if (!result.success) {
        res.status(400).json(result.error.format());
        return;
    }
    next();
};