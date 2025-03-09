# TodoApp Express

## Project Overview

**TodoApp Express** is a task management application built using **Node.js** with **Express**. It provides basic functionality to manage users, projects, and tasks, and can be extended to suit more advanced features. The app uses **Knex.js** for database migrations and seeding, and **PostgreSQL** as the database. The application supports secure user authentication using **bcrypt** for password hashing and **UUID** for unique identifiers.

This project provides a foundation for building a full-fledged application with tasks, user management, and authentication.

## Tech Stack

- **Node.js**: The runtime environment for executing JavaScript code server-side.
- **Express**: A fast, minimal, and flexible Node.js web application framework for building APIs and server-side logic.
- **TypeScript**: Adds type safety and modern JavaScript features to the application.
- **Knex.js**: A SQL query builder for Node.js, used for migrations, seeding, and querying PostgreSQL.
- **PostgreSQL**: A powerful, open-source relational database for storing application data.
- **Zod**: A TypeScript-first schema validation library for robust and scalable validation.
- **bcrypt**: A library for securely hashing passwords and verifying them during authentication.
- **UUID**: A library for generating universally unique identifiers (UUIDs) to assign unique IDs to resources.
- **Nodemon**: A utility that monitors for changes in the source code and automatically restarts the server during development.
- **dotenv**: A zero-dependency module for loading environment variables from a `.env` file into `process.env`.

## Features

- **User Management**: Allows creating, updating, and deleting users. Each user is identified by a unique UUID.
- **Task Management**: Users can create tasks, assign them to projects, and track their status.
- **Project Management**: Organize tasks under projects and manage project owners.
- **Data Validation**: Uses Zod for validating request bodies and parameters, ensuring data integrity.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/todoapp-express.git
   cd todoapp-express
   ```

2. Install the dependencies using pnpm:

   ```bash
   pnpm install
   ```

3. Clone the repository to your local machine:

   ```bash
   DATABASE_URL=your_postgresql_connection_string
   ```

4. Set up the PostgreSQL database by running migrations and seeding data:

   ```bash
    pnpm migrate:up   # Run migrations
    pnpm seed         # Seed the database with initial data
   ```

## Available Scripts

- `pnpm dev`: Starts the development server using **Nodemon**, automatically restarting on code changes.
- `pnpm migrate:up`: Applies the latest migrations to the database.
- `pnpm migrate:down`: Rolls back the last applied migration.
- `pnpm seed`: Seeds the database with predefined data.

## Running the App

Once you've set up the environment and seeded the database, you can start the application:

```bash
   pnpm dev
```

## Future Improvements

1. Implement User Authentication (Cognito, Oauth2, OIDC, etc..)
2. Implement Unit tests to check every endpoint, authentication, error handling, data validation
3. Task Priority and Status Management
   Priority Levels: Add a priority field to tasks (e.g., "low", "medium", "high") and allow users to sort or filter tasks based on their priority. This would help users focus on the most critical tasks first.
4. User Roles and Permissions
   Admin and User Roles: Introduce user roles (e.g., Admin, User, Manager) to give different levels of access to various parts of the application. For example, only admins can create new projects, whereas regular users can only create tasks within existing projects.
   Access Control: Implement fine-grained access control for tasks and projects, ensuring that users can only see and interact with tasks they own or are assigned to.
5. Real-time Task Updates
   WebSocket Integration: Allow real-time task updates through WebSockets. This feature would enable users to see when a task's status changes, new comments are added, or when someone completes a task, without needing to refresh the page.
6. Project Archiving
   Archiving Completed Projects: Provide the option to archive old or completed projects to declutter the user's workspace while retaining the data. Archived projects could still be accessible for reference, but would no longer be visible in the active projects list.
7. Task and Project Analytics
   Analytics Dashboard: Create an analytics dashboard where users can view statistics such as completed tasks, ongoing projects, and task completion trends. This would help users track productivity and project progress over time.
   Export Data: Implement a feature that allows users to export task lists and project details into common file formats (e.g., CSV, Excel, or PDF). This would make it easier for users to back up or share their work.
8. Mobile App Integration
   Mobile Version: Extend the application to work as a mobile app using React Native or a similar framework, allowing users to manage their tasks and projects on the go. The app could sync with the web version for seamless cross-platform access.
9. Email Notifications
   Task Due Date Alerts: Implement an email notification system to remind users of upcoming tasks or deadlines. This feature can be customized, so users can choose to receive notifications for different task statuses or priority levels.
   Comment Notifications: Send email notifications when a new comment is added to a task they are following, helping to keep users updated with the latest discussions.
