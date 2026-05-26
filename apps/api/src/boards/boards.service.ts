import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { Task } from '../tasks/entities/task.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

const DEFAULT_TASKS = [
  { title: 'Task in Progress', status: 'in-progress' as const, icon: '🕐' },
  { title: 'Task Completed', status: 'completed' as const, icon: '⚡' },
  { title: "Task Won't Do", status: 'wont-do' as const, icon: '☕' },
  {
    title: 'Task To Do',
    status: 'todo' as const,
    icon: '📚',
    description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
  },
];

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private readonly boardRepo: Repository<Board>,
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  async create(dto: CreateBoardDto = {}): Promise<Board> {
    const board = this.boardRepo.create({
      name: dto.name ?? 'My Task Board',
      description: dto.description ?? 'Tasks to keep organised',
    });
    const saved = await this.boardRepo.save(board);

    const tasks = DEFAULT_TASKS.map((t) =>
      this.taskRepo.create({ ...t, boardId: saved.id }),
    );
    await this.taskRepo.save(tasks);

    return this.findOne(saved.id);
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!board) throw new NotFoundException(`Board ${id} not found`);
    return board;
  }

  async update(id: string, dto: UpdateBoardDto): Promise<Board> {
    await this.findOne(id);
    await this.boardRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const board = await this.findOne(id);
    await this.boardRepo.remove(board);
  }

  async addTask(boardId: string): Promise<Task> {
    await this.findOne(boardId);
    const task = this.taskRepo.create({
      title: 'New Task',
      icon: '📝',
      status: 'todo',
      boardId,
    });
    return this.taskRepo.save(task);
  }
}
