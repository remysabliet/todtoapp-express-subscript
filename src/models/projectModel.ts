import { Knex } from "knex";
import type { Project } from "T/project"; // Make sure you define a Project type in your types folder
import knexInstance from '@/db/db'

export class ProjectModel {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  // Get all projects
  async getAllProjects(): Promise<Project[]> {
    return this.knex("projects").select("*");
  }

  // Get a project by ID
  async getProjectById(id: string): Promise<Project | null> {
    const project = await this.knex("projects").where({ id }).first();
    return project || null;
  }

  // Create a new project
  async createProject(project: Project): Promise<Project> {
    const [newProject] = await this.knex("projects").insert(project).returning("*");
    return newProject;
  }

  // Update an existing project
  async updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
    const [updatedProject] = await this.knex("projects")
      .where({ id })
      .update(project)
      .returning("*");
    return updatedProject || null;
  }

  // Delete a project by ID
  async deleteProject(id: string): Promise<number> {
    const deletedCount = await this.knex("projects").where({ id }).del();
    return deletedCount;
  }

  // Check if project name exists
  async findByName(name: string): Promise<Project | null> {
    return this.knex("projects").where({ name }).first();
  }
}

export const projectModel = new ProjectModel(knexInstance);
