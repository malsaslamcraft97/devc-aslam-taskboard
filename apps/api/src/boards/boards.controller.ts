import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() dto: CreateBoardDto) {
    return this.boardsService.create(dto);
  }

  @Get(':boardId')
  findOne(@Param('boardId') boardId: string) {
    return this.boardsService.findOne(boardId);
  }

  @Put(':boardId')
  update(@Param('boardId') boardId: string, @Body() dto: UpdateBoardDto) {
    return this.boardsService.update(boardId, dto);
  }

  @Delete(':boardId')
  @HttpCode(204)
  remove(@Param('boardId') boardId: string) {
    return this.boardsService.remove(boardId);
  }

  @Post(':boardId/tasks')
  addTask(@Param('boardId') boardId: string) {
    return this.boardsService.addTask(boardId);
  }
}
