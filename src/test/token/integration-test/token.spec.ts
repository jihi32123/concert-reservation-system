import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { QueueService } from 'src/domain/queue/application/queue.service';

describe('QueueService (Integration)', () => {
  let queueService: QueueService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule], // 실제 Prisma 모듈을 불러옴
      providers: [QueueService, QueueRepository],
    }).compile();

    queueService = module.get<QueueService>(QueueService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.$executeRaw`DELETE FROM Token`; 
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('issueToken', () => {
    it('should issue a new token for the given userId', async () => {
      const userId = 'test-user';
      
      const result = await queueService.issueToken(userId);

      expect(result.token.userId).toBe(userId);
      expect(result.token.status).toBe('WAITING');

      const tokenInDb = await prisma.token.findUnique({
        where: { userId },
      });

      expect(tokenInDb).toBeTruthy();
      expect(tokenInDb?.userId).toBe(userId);
      expect(tokenInDb?.status).toBe('WAITING');
    });
  });

  describe('getToken', () => {
    it('should return a token for the given userId', async () => {
      const userId = 'test-user';

      await queueService.issueToken(userId);

      const result = await queueService.getToken(userId);

      expect(result.userId).toBe(userId);
      expect(result.status).toBe('WAITING');
    });

    it('should throw an error if no token is found for the given userId', async () => {
      await expect(queueService.getToken('non-existing-user')).rejects.toThrowError('No token found for user');
    });
  });
});
