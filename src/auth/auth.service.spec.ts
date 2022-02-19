import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

const userArray = [
  { email: 'test1@naver.com', nickname: 'test1', password: '1234' },
  { email: 'test2@naver.com', nickname: 'test2', password: '1234' },
];

const userOne = userArray[0];

const db = {
  /* prismaService.user.findFirst 또한 prisma가 연결되어 있고
  연결된 prsima db에서 User테이블에서 특정 object paramter를 받아서
  db와 paramter관계에 따라 응답을 주는 복잡한 코드임.
  하지만 jest씀으로 인해 아 몰라~ 그냥 이거 내놔해서
  prisma와 db의 연결 종속성 없이 ㅍㅁ해결이 가능함
  */
  user: {
    findFirst: jest.fn().mockResolvedValue(userOne),
  },
};

const jwt = {
  /* jwtservice에서 sign은 db에서 정보를 가져오고 
  일치 여부를 확인 후 token을 응답해주는 복잡한 코드인데
  jest.fn으로 복잡한 로직없이 바로 return가능*/
  sign: jest.fn().mockResolvedValue('tokenbyjestfn'),
};

describe('BoardService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: db,
        },
        {
          provide: JwtService,
          useValue: jwt,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('[GET] /auth/test', () => {
    it('로그인 test문자', async () => {
      const result = await service.test();
      expect(result['test']).toEqual('success');
    });
  });

  describe('[POST] /auth/login', () => {
    it('게시글 정보 가져오기', async () => {
      const testUser = { username: 'test2', sub: 2 };
      const result = await service.login(testUser);
      expect(result['success']).toEqual(true);
    });
  });

});
