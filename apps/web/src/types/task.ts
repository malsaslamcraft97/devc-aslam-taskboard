export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'wont-do';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  icon: string;
}
