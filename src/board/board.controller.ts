import { Controller, Get, Post, Body, Put, Patch, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시글 생성
  @Post()
  create(@Body() data: CreateBoardDto) {
    return this.boardService.create(data);
  }

  // 게시글 전체 조회
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  // 게시글 1개 조회
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  // 게시글 업데이트
  @Put()
  update(@Body() data: UpdateBoardDto) {
    return this.boardService.update(data);
  }
}
