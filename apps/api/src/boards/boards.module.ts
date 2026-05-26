import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Task } from '../tasks/entities/task.entity';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
