import { Knex } from "knex";
import type { Task } from "T/task"; // Ensure you define a Task type in your types folder
import knexInstance from "@/db/db";

export class TaskModel {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // Get all tasks
  async getAllTasks(): Promise<Task[]> {
    return this.knex("tasks").select("*");
  }

  // Get a task by ID
  async getTaskById(id: string): Promise<Task | null> {
    const task = await this.knex("tasks").where({ id }).first();
    return task || null;
  }

  // Create a new task
  async createTask(task: Task): Promise<Task> {
    const [newTask] = await this.knex("tasks").insert(task).returning("*");
    return newTask;
  }

  // Update an existing task
  async updateTask(id: string, task: Partial<Task>): Promise<Task | null> {
    const [updatedTask] = await this.knex("tasks")
      .where({ id })
      .update(task)
      .returning("*");
    return updatedTask || null;
  }

  // Delete a task by ID
  async deleteTask(id: string): Promise<number> {
    const deletedCount = await this.knex("tasks").where({ id }).del();
    return deletedCount;
  }

  // Find a task by title
  async findByTitle(title: string): Promise<Task | null> {
    return this.knex("tasks").where({ title }).first();
  }

  // Find tasks by project ID
  async findByProjectId(projectId: string): Promise<Task[]> {
    return this.knex("tasks").where({ project_id: projectId });
  }

  // Find tasks by user ID (assigned tasks)
  async findByUserId(userId: string): Promise<Task[]> {
    return this.knex("tasks").where({ user_id: userId });
  }
}

export const taskModel = new TaskModel(knexInstance);
