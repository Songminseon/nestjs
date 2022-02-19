import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedTest() {
  await prisma.user.createMany({
    data: [
      {
        email: 'test1@naver.com',
        nickname: 'test1',
        password: await bcrypt.hash('1234', 10),
      },
      {
        email: 'test2@naver.com',
        nickname: 'test2',
        password: await bcrypt.hash('1234', 10),
      },
    ],
  });

  await prisma.board.createMany({
    data: [
      {
        title: 'test title',
        content: '임의의 내용입니다.',
        userId: 1,
      },
      {
        title: 'test title2',
        content: '임의의 내용입니다2.',
        userId: 2,
      },
    ],
  });

  await prisma.comment.createMany({
    data: [
      {
        content: '댓글 달았음1',
        userId: 1,
        boardId: 1,
      },
      {
        content: '게시글2에 댓글담',
        userId: 1,
        boardId: 2,
      },
      {
        content: '다른사용자가 달음',
        userId: 2,
        boardId: 1,
      },
      {
        content: '다른사용자가 달음 다른게시판에',
        userId: 2,
        boardId: 2,
      },
    ],
  });
}

export default seedTest;
