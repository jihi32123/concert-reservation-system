import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from 'src/domain/queue/application/queue.service';
import { QueueRepository } from 'src/domain/queue/repository/queue.repository';


describe('QueueService', () => {
  let queueService: QueueService;
  let queueRepository: QueueRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        {
          provide: QueueRepository,
          useValue: {
            createToken: jest.fn(),
            getTokenByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    queueService = module.get<QueueService>(QueueService);
    queueRepository = module.get<QueueRepository>(QueueRepository);
  });

  describe('issueToken', () => {
    it('should issue a new token for the given userId', async () => {
      const mockToken = { id: '123', userId: 'test-user', status: 'WAITING' };
      jest.spyOn(queueRepository, 'createToken').mockResolvedValue(mockToken);

      const result = await queueService.issueToken('test-user');

      expect(queueRepository.createToken).toHaveBeenCalledWith('test-user');
      expect(result).toEqual({ token: mockToken });
    });
  });

  describe('getToken', () => {
    it('should return a token for the given userId', async () => {
      const mockToken = { id: '123', userId: 'test-user', status: 'WAITING' };
      jest.spyOn(queueRepository, 'getTokenByUserId').mockResolvedValue(mockToken);

      const result = await queueService.getToken('test-user');

      expect(queueRepository.getTokenByUserId).toHaveBeenCalledWith('test-user');
      expect(result).toEqual(mockToken);
    });

    it('should throw an error if no token is found for the given userId', async () => {
      jest.spyOn(queueRepository, 'getTokenByUserId').mockResolvedValue(null);

      await expect(queueService.getToken('test-user')).rejects.toThrowError('No token found for user');
      expect(queueRepository.getTokenByUserId).toHaveBeenCalledWith('test-user');
    });
  });
});
