import express from "express";

import { apiRouter } from "./routes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middleware
app.use(express.json());

// TODO: making sure the user is authenticated before accessing routes
// app.use("/api", protect, router);

// Routes
app.use("/api", apiRouter);

// Error handling middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
