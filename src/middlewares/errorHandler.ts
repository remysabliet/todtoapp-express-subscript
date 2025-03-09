
import { Request, Response, NextFunction } from "express";

/**
 * Error handling middleware for catching and handling errors in the Express app.
 * This middleware will catch any error thrown in the route handlers or other middlewares.
 * It ensures consistent error responses and logs non-operational errors (unexpected errors).
 * 
 * @param {Error} err - The error object caught by the middleware.
 * @param {express.Request} req - The Express request object, representing the HTTP request.
 * @param {express.Response} res - The Express response object, used to send the HTTP response.
 * @param {express.NextFunction} next - The next middleware function in the pipeline, used for passing control to the next middleware.
 * 
 * @returns {void} - This middleware does not return a value but sends an error response.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Default error handler for unexpected errors
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    // Check if the error is operational (i.e., expected errors like validation issues)
    const isOperational = err.isOperational || false;

    // Log the error (you can use a logger like winston, pino, etc.)
    if (!isOperational) {
        console.error(err);  // In a real-world app, use a logger to log detailed info about the error
    }

    // Send the error response
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development
    });
};