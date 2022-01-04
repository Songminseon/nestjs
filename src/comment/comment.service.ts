import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCommentDto) {
    try {
      const { content, userId, boardId } = data;
      await this.prisma.comment.create({
        data: {
          content,
          userId,
          boardId,
        },
      });
    } catch {
      throw new BadRequestException('bad request');
    }
  }

  async find(id: number): Promise<object> {
    try {
      const getComment = await this.prisma.comment.findMany({
        where: {
          boardId: id,
        },
      });
      return {
        success: true,
        data: getComment,
      };
    } catch {
      throw new BadRequestException('bad request');
    }
  }

  async update(data: UpdateCommentDto): Promise<object> {
    try {
      const { id, content } = data;
      await this.prisma.comment.update({
        where: {
          id,
        },
        data: {
          content,
        },
      });
      return {
        status: true,
        data: {},
        message: 'comment change',
      };
    } catch {
      throw new BadRequestException('bad request');
    }
  }
}
