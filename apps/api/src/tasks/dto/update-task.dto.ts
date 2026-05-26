import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  icon?: string;
  status?: TaskStatus;
}
