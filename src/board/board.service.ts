import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBoardDto): Promise<object> {
    try {
      const { title, content, userId } = data;
      await this.prisma.board.create({
        data: {
          title,
          content,
          userId,
        },
      });
      return {
        success: true,
        data: {},
        message: 'board create',
      };
    } catch (err) {
      console.log(err, 'err');
      throw new BadRequestException('bad request');
    }
  }

  async findAll(): Promise<object> {
    const getBoardAll = await this.prisma.board.findMany({
      select: {
        id: false,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        comment: true,
      },
    });
    return {
      success: true,
      data: getBoardAll,
    };
  }

  async findOne(id: number): Promise<object> {
    const getBoard: object | null = await this.prisma.board.findUnique({
      where: {
        id: id,
      },
    });
    if (!getBoard) {
      throw new NotFoundException('not found');
    }
    return {
      success: true,
      data: getBoard,
    };
  }

  async update(data: UpdateBoardDto): Promise<object> {
    try {
      const { id, title, content } = data;
      await this.prisma.board.update({
        where: {
          id,
        },
        data: {
          title,
          content,
          updatedAt: new Date(),
        },
      });
      return {
        success: true,
        data: {},
        message: 'board update',
      };
    } catch (err) {
      console.log('err', err);
      throw new BadRequestException('bad request');
    }
  }
}
