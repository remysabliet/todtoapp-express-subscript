import { Project } from "T/project";
import { ConflictError, DB_ERRORS, NotFoundError } from "@/errors";
import { projectModel } from "@/models/projectModel";
import { userModel } from "@/models/userModel";




export class ProjectService {
    // Get all projects
    async getAllProjects(): Promise<Project[]> {
        return projectModel.getAllProjects();
    }

    // Get a project by ID
    async getProjectById(id: string): Promise<Project | null> {
        const project = await projectModel.getProjectById(id);
        if (!project) {
            throw new NotFoundError("Project not found");
        }
        return project;
    }

    // Create a new project
    async createProject(project: Project): Promise<Project> {
        try {
            // Check if the owner_id exists in the users table
            const ownerExists = await userModel.getUserById(project.owner_id);
            if (!ownerExists) {
                throw new NotFoundError("Owner not found.");
            }

            // Check if a project with the new name already exists (globally)
            const existingProject = await projectModel.findByName(project.name);
            if (existingProject?.id !== project.id) {
                throw new ConflictError("A project with this name already exists.");
            }

            // Attempt to create a new project
            return await projectModel.createProject(project);
        } catch (error: any) {
            // If a conflict occurs due to a duplicate name, throw a ConflictError
            if (error.code === DB_ERRORS.UNIQUE_VIOLATION) { // Unique violation error code for PostgreSQL
                throw new ConflictError("A project with this name already exists.");
            }
            throw error; // Re-throw other errors
        }
    }

    // Update an existing project
    async updateProject(id: string, project: Project): Promise<Project | null> {
        try {
            // Check if the project exist
            const existingProject = await projectModel.getProjectById(id);
            if (!existingProject) {
                throw new NotFoundError("Project not found.");
            }

            // Check if the owner_id exists in the users table
            const ownerExists = await userModel.getUserById(project.owner_id);
            if (!ownerExists) {
                throw new NotFoundError("Owner not found.");
            }

            // Check if a project with the new name already exists (globally)
            const existingProject2 = await projectModel.findByName(project.name);
            if (existingProject2?.id !== id) {
                throw new ConflictError("A project with this name already exists.");
            }

            // Proceed to update the project
            return await projectModel.updateProject(id, project);

        } catch (error: any) {
            // If a conflict occurs due to a duplicate name, throw a ConflictError
            if (error.code === DB_ERRORS.UNIQUE_VIOLATION) { // Unique violation error code for PostgreSQL
                throw new ConflictError("A project with this name already exists.");
            }
            throw error; // Re-throw other errors
        }
    }

    // Delete a project
    async deleteProject(id: string): Promise<number> {
        const deletedCount = await projectModel.deleteProject(id);
        if (!deletedCount) {
            throw new NotFoundError("Project not found");
        }
        return deletedCount;
    }
}

export const projectServices = new ProjectService();
