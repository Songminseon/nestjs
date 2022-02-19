import { PrismaClient } from '@prisma/client';
import seedTest from './seedTest';

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === 'test') {
    seedTest();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
