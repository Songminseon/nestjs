import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, inputPassword: string): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      const { password, ...result } = user;

      const passwordValid = await bcrypt.compare(inputPassword, password);
      if (!passwordValid) {
        throw new UnauthorizedException();
      }
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('login succes')
    const payload = { username: user.username, sub: user.userId };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async test() {
    return {
      test: "success"
    }
  }

  async logout() {
    return true;
  }
}
