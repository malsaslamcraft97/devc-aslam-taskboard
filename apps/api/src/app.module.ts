import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards/entities/board.entity';
import { Task } from './tasks/entities/task.entity';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'task-board.sqlite',
      entities: [Board, Task],
      synchronize: true,
    }),
    BoardsModule,
    TasksModule,
  ],
})
export class AppModule {}
