import { Request, Response, NextFunction } from "express";

import { NotFoundError, ConflictError } from "@/errors/customErrors";
import { userService } from "@/services/userServices";

export const userController = {
    getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    getUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    },

    createUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof ConflictError) {
                return next(error);
            }
            next(error);
        }
    },

    updateUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const updatedUser = await userService.updateUser(id, req.body);
            if (!updatedUser) {
                throw new NotFoundError("User not found");
            }
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const deletedCount = await userService.deleteUser(id);
            if (!deletedCount) {
                throw new NotFoundError("User not found");
            }
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            next(error);
        }
    },
};
