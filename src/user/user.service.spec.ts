import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('테스트 코드 테스트', () => {
  it('test equal', () => {
    expect(1 + 1).toEqual(2);
  });
});

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  // db지우기
  // afterAll(async () => {
  //   await prismaService.user.deleteMany({});
  // });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 간단한 테스트 코드
  describe('[GET] /user/:id', () => {
    it('사용자 정보 가져오기', async () => {
      const result = await service.findOne(1);
      expect(result).toBeInstanceOf(Object);
      expect(result['success']).toEqual(true);
    });

    it('존재하지 않는 데이터', async () => {
      try {
        await service.findOne(9999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('invalid data');
      }
    });
  });

  describe('[POST] /user', () => {
    it('사용자 생성', async () => {
      const dummyData = {
        email: 'smsun0329@naver.com',
        nickname: 'name1',
        password: '1234',
      };

      const result = await service.create(dummyData);
      expect(result['success']).toEqual(true);
    });

    it('사용자 중복 이메일', async () => {
      const dummyData = {
        email: 'test1@naver.com',
        nickname: 'szzxcasd',
        password: '1234',
      };
      const result = await service.create(dummyData);
      expect(result['success']).toEqual(false);
      expect(result['message']).toEqual('already existed email');
    });

    it('사용자 중복 닉네임', async () => {
      const dummyData = {
        email: 'smsun32awdas@naver.com',
        nickname: 'test2',
        password: '1234',
      };
      const result = await service.create(dummyData);
      expect(result['success']).toEqual(false);
      expect(result['message']).toEqual('already existed nickname');
    });
  });

  it('사용자 input error', async () => {
    const dummyData = {
      email: 'abc',
      nickname: 'name1',
      password: '12sdasd',
    };
    try {
      await service.create(dummyData);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  describe('[PATCH] /user', () => {
    it('사용자 업데이트', async () => {
      const dummyData = {
        id: 1,
        nickname: 'handsome',
      };

      const result = await service.update(dummyData);
      expect(result['success']).toEqual(true);
    });
  });
});
