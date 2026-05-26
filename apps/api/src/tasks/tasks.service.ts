import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    Object.assign(task, dto);
    return this.taskRepo.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    await this.taskRepo.remove(task);
  }
}
