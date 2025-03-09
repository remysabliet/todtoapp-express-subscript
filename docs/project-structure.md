my-project/
├── src/
│ ├── config/ # Configuration files (e.g., environment variables)
│ │ └── index.ts # General configurations (e.g., environment variables)
│ ├── controllers/ # Route handlers (controller logic)
│ │ └── userController.ts # Example controller
│ ├── db/ # Database-related files
│ │ ├── knexfile.ts # Knex configuration
│ │ ├── migrations/ # Knex migrations
│ │ └── queries.ts # Query builders or DB-related logic
│ ├── middlewares/ # Middleware functions
│ │ └── authMiddleware.ts # Example middleware (e.g., authentication check)
│ ├── models/ # Business logic (interacts with the database)
│ │ └── userModel.ts # Example model (handles DB interaction)
│ ├── routes/ # Express route definitions
│ │ └── userRoutes.ts # Example routes
│ ├── services/ # Business logic layer (optional)
│ │ └── userService.ts # Example service for handling user-related logic
│ ├── types/ # TypeScript types
│ │ └── userTypes.ts # Example types (e.g., User interface)
│ ├── utils/ # Utility functions
│ │ └── validation.ts # Example validation functions using Zod
│ ├── app.ts # Main app initialization (express setup)
│ └── server.ts # Server setup and listen
├── .env # Environment variables
├── .gitignore # Git ignore file
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── pnpm-lock.yaml # pnpm lock file
