export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'wont-do';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  icon: string;
  boardId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBoardDto {
  name?: string;
  description?: string;
}

export interface UpdateBoardDto {
  name?: string;
  description?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
  icon?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  icon?: string;
}
