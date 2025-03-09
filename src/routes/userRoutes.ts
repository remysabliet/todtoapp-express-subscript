import express, { Request, Response, NextFunction } from "express";

import { validateIdParam } from '@/schemas/commonSchema'
import { validateUser } from "@/schemas/userSchema";
import { userController } from "@/controllers/userController";

export const userRoutes = express.Router();

// Create a new user with validation
userRoutes.post(
    "/",
    validateUser,
    userController.createUser
);

// Update an existing user with validation
userRoutes.put(
    "/:id",
    validateIdParam,
    validateUser,
    userController.updateUser
);
// Get all users (no validation needed)
userRoutes.get(
    "/",
    userController.getAllUsers
);

// Get user by ID with validation of the `id` parameter
userRoutes.get(
    "/:id",
    validateIdParam,
    userController.getUserById
);

// Delete a user with validation of the `id` parameter
userRoutes.delete(
    "/:id",
    validateIdParam,
    userController.deleteUser
);


