export interface Task {
  id?: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  due_date?: string;
  project_id: string;
  user_id?: string;
}
