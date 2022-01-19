import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 유저 생성
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  // 유저 1명 조회
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // 유저 수정
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() data: UpdateUserDto) {
    return this.userService.update(data);
  }
}
