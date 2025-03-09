import { Knex } from "knex";

import type { User } from 'T/user'

import knexInstance from '@/db/db'

export class UserModel {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.knex("users").select("*");
  }

  // Get a user by ID
  async getUserById(id: string): Promise<User | null> {
    const user = await this.knex("users").where({ id }).first();
    return user || null;
  }

  // Create a new user
  async createUser(user: User): Promise<User> {
    const [newUser] = await this.knex("users").insert(user).returning("*");
    return newUser;
  }

  // Update an existing user
  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    const [updatedUser] = await this.knex("users")
      .where({ id })
      .update(user)
      .returning("*");
    return updatedUser || null;
  }

  // Delete a user by ID
  async deleteUser(id: string): Promise<number> {
    const deletedCount = await this.knex("users").where({ id }).del();
    return deletedCount;
  }

  async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
    return this.knex("users").where("email", email).orWhere("username", username).first();
  }
}

export const userModel = new UserModel(knexInstance)

