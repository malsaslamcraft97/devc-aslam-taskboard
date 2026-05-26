import { Body, Controller, Delete, HttpCode, Param, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Put(':taskId')
  update(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(taskId, dto);
  }

  @Delete(':taskId')
  @HttpCode(204)
  remove(@Param('taskId') taskId: string) {
    return this.tasksService.remove(taskId);
  }
}
