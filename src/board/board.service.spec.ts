import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService, PrismaService],
    }).compile();
    service = module.get<BoardService>(BoardService);
  });

  describe('[GET] /board', () => {
    it('게시글 정보 가져오기', async () => {
      const result = await service.findAll();
      expect(result).toBeInstanceOf(Object);
      expect(result['data']).toBeInstanceOf(Array);
      expect(result['success']).toEqual(true);
    });
  });

  describe('[GET] /board/:id', () => {
    it('게시글 정보 가져오기', async () => {
      const result = await service.findOne(1);
      expect(result['success']).toEqual(true);
    });
  });
});
