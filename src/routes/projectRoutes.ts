import express from "express";

import { validateIdParam } from '@/schemas/commonSchema'
import { validateProject } from "@/schemas/projectSchema";
import { projectController } from "@/controllers/projectController";

export const projectRoutes = express.Router();

// Create a new project with validation
projectRoutes.post(
    "/",
    validateProject, // Assuming you have a schema to validate project data
    projectController.createProject
);

// Update an existing project with validation
projectRoutes.put(
    "/:id",
    validateIdParam, // Validation for the project ID in the URL
    validateProject, // Validate the updated project data
    projectController.updateProject
);

// Get all projects (no validation needed)
projectRoutes.get(
    "/",
    projectController.getAllProjects
);

// Get project by ID with validation of the `id` parameter
projectRoutes.get(
    "/:id",
    validateIdParam, // Validate project ID
    projectController.getProjectById
);

// Delete a project with validation of the `id` parameter
projectRoutes.delete(
    "/:id",
    validateIdParam, // Validate project ID
    projectController.deleteProject
);
