import type { User } from "T/user";

import { DB_ERRORS, ConflictError, NotFoundError } from '@/errors/'
import { userModel } from "@/models/userModel";
import { hashText } from '@/utils/bcryptUtils'

export class UserService {
    // Get all users
    async getAllUsers(): Promise<User[]> {
        return userModel.getAllUsers();
    }

    // Get user by ID
    async getUserById(id: string): Promise<User | null> {
        const user = await userModel.getUserById(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    }

    // Create a new user
    async createUser(user: User): Promise<User> {
        try {
            // Hash password before storing
            const hashedPassword = await hashText(user.password);

            // Attempt to create user
            return await userModel.createUser({ ...user, password: hashedPassword });
        } catch (error: any) {
            if (error.code === DB_ERRORS.UNIQUE_VIOLATION) {
                throw new ConflictError("A user with this email or username already exists.");
            }
            throw error; // Re-throw other errors
        }
    }

    // Update user
    async updateUser(id: string, user: User): Promise<User | null> {

        // Check if email or username already exist for other users
        const existingUser = await userModel.findByEmailOrUsername(user.email, user.username);

        if (existingUser && existingUser.id !== id) {
            // If the user already exists and is not the current user
            if (existingUser.email === user.email) {
                throw new ConflictError("Email is already taken.");
            }
            if (existingUser.username === user.username) {
                throw new ConflictError("Username is already taken.");
            }
        }

        // Proceed with the update if no conflicts
        return await userModel.updateUser(id, user);
    }

    // Delete user
    async deleteUser(id: string): Promise<number> {
        const deletedCount = await userModel.deleteUser(id);
        if (!deletedCount) {
            throw new NotFoundError("User not found");
        }
        return deletedCount;
    }
}

export const userService = new UserService();
