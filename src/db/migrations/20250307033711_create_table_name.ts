import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return (
    knex.schema
      // Users Table
      .createTable("users", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()")); // auto-incrementing primary key
        table.string("username", 30).unique().notNullable(); // username with max length 30
        table.string("email", 255).unique().notNullable(); // email with max length 255
        table.string("password", 255).notNullable(); // password field (max length 255 for security)
        table.timestamp("created_at").defaultTo(knex.fn.now()); // created_at field with default timestamp

        // Index for fast lookups
        table.index("username"); // index on username
      })

      // Projects Table
      .createTable("projects", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()")); // auto-incrementing primary key
        table.string("name", 100).unique().notNullable(); // project name with max length 100
        table.text("description").nullable(); // project description, nullable text field
        table.uuid("owner_id").unsigned().notNullable(); // owner user_id (foreign key)
        table.timestamp("created_at").defaultTo(knex.fn.now()); // created_at field with default timestamp

        // Foreign key constraint for owner
        table
          .foreign("owner_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");

        // Index for fast lookups
        table.index("owner_id"); // index on owner_id
      })

      // Tasks Table
      .createTable("tasks", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()")); // auto-incrementing primary key
        table.string("title", 255).notNullable(); // task title with max length 255
        table.text("description").nullable(); // task description, nullable text field
        table
          .enu("status", ["pending", "in_progress", "completed"])
          .defaultTo("pending"); // task status
        table.timestamp("due_date").nullable(); // task due date
        table.uuid("project_id").unsigned().notNullable(); // project_id (foreign key)
        table.uuid("user_id").unsigned().nullable(); // user_id (assigned user, foreign key)

        // Foreign key constraints
        table
          .foreign("project_id")
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE"); // link to projects
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("SET NULL"); // link to users, can be NULL if unassigned

        // Indexes for performance
        table.index("project_id"); // index on project_id
        table.index("user_id"); // index on user_id

        // Ensure that the user_id is null if a task is unassigned, but enforce one user per task
        table.unique(["id"]); // make sure task id is unique (already default)
      })
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("tasks");
  await knex.schema.dropTableIfExists("projects");
  await knex.schema.dropTableIfExists("users");
}

