import { Controller, Get, Post, Body, Patch, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 작성
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  // 게시글의 댓글 전체 조회 query
  @Get()
  findOne(@Query('id') id: string) {
    return this.commentService.find(+id);
  }

  // 댓글 수정
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() data: UpdateCommentDto) {
    return this.commentService.update(data);
  }
}
