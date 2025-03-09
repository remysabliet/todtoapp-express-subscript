import { Request, Response, NextFunction } from "express";

import { NotFoundError, ConflictError } from "@/errors/customErrors";
import { projectServices } from "@/services/projectServices";

export const projectController = {
    // Get all projects
    getAllProjects: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const projects = await projectServices.getAllProjects();
            res.json(projects);
        } catch (error) {
            next(error);
        }
    },

    // Get a project by ID
    getProjectById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const project = await projectServices.getProjectById(id);
            if (!project) {
                throw new NotFoundError("Project not found");
            }
            res.json(project);
        } catch (error) {
            next(error);
        }
    },

    // Create a new project
    createProject: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const project = await projectServices.createProject(req.body);
            res.status(201).json(project);
        } catch (error) {
            if (error instanceof ConflictError) {
                return next(error);
            }
            next(error);
        }
    },

    // Update an existing project
    updateProject: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const updatedProject = await projectServices.updateProject(id, req.body);
            if (!updatedProject) {
                throw new NotFoundError("Project not found");
            }
            res.json(updatedProject);
        } catch (error) {
            next(error);
        }
    },

    // Delete a project
    deleteProject: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const deletedCount = await projectServices.deleteProject(id);
            if (!deletedCount) {
                throw new NotFoundError("Project not found");
            }
            res.json({ message: "Project deleted successfully" });
        } catch (error) {
            next(error);
        }
    },
};
