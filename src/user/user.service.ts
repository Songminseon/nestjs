import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<object> {
    const { email, nickname, password } = data;

    try {
      // 중복이메일 시
      const exEmail = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      // 중복 닉네임 시
      const exNickname = await this.prisma.user.findUnique({
        where: {
          nickname: nickname,
        },
      });

      if (exEmail) {
        return {
          success: false,
          data: {},
          message: 'already existed email',
        };
      }

      if (exNickname) {
        return {
          success: false,
          data: {},
          message: 'already existed nickname',
        };
      }

      const hashPassword = await bcrypt.hash(password, 10);
      await this.prisma.user.create({
        data: {
          email,
          nickname,
          password: hashPassword,
        },
      });
      return {
        success: true,
        data: {},
        message: 'user create',
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('bad requset');
    }
  }

  async findOne(id: number): Promise<object> {
    const getUser: object | null = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: false,
        email: true,
        nickname: true,
        password: false,
        createdAt: true,
      },
    });

    // 없는 요청시 400
    if (!getUser) {
      throw new NotFoundException(`invalid data`);
    }

    return {
      success: true,
      data: getUser,
    };
  }

  async update(data: UpdateUserDto): Promise<object> {
    const { id, nickname } = data;
    const exNickname = await this.prisma.user.findUnique({
      where: {
        nickname: nickname,
      },
    });

    // 중복 닉네임 체크
    if (exNickname) {
      return {
        success: false,
        data: {},
        message: 'already existed nickname',
      };
    }

    try {
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          nickname,
        },
      });
      return {
        success: true,
        data: {},
        message: 'nickname change',
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('bad request');
    }
  }
}
