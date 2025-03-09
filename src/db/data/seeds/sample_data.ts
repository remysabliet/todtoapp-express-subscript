import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt'

export async function seed(knex: Knex) {

  const userId1 = await uuidv4()
  const userId2 = await uuidv4()
  const userId3 = await uuidv4()

  // Inserts seed entries for users
  await knex("users").insert([
    {
      id: userId1,
      username: "alice",
      email: "alice@example.com",
      password: await bcrypt.hash("password123", 10),
    },
    {
      id: userId2,
      username: "bob",
      email: "bob@example.com",
      password: await bcrypt.hash("password123", 10),
    },
    {
      id: userId3,
      username: "charlie",
      email: "charlie@example.com",
      password: await bcrypt.hash("password123", 10),
    },
  ]);

  const projectId1 = await uuidv4()
  const projectId2 = await uuidv4()

  // Inserts seed entries for projects
  await knex("projects").insert([
    {
      id: projectId1,
      name: "Project A",
      description: "This is the first project",
      owner_id: userId1,
    },
    {
      id: projectId2,
      name: "Project B",
      description: "This is the second project",
      owner_id: userId2,
    },
  ]);

  // Inserts seed entries for tasks
  await knex("tasks").insert([
    {
      id: uuidv4(),
      title: "Task 1",
      description: "Task for Project A",
      status: "pending",
      due_date: "2025-03-15",
      project_id: projectId1,
      user_id: userId1,
    },
    {
      id: uuidv4(),
      title: "Task 2",
      description: "Task for Project B",
      status: "in_progress",
      due_date: "2025-03-20",
      project_id: projectId2,
      user_id: userId2,
    },
    {
      id: uuidv4(),
      title: "Task 3",
      description: "Task for Project A",
      status: "completed",
      due_date: "2025-03-25",
      project_id: projectId1,
      user_id: userId3,
    },
  ]);
}
