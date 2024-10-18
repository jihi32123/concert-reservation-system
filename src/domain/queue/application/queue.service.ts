import { Injectable } from '@nestjs/common';
import { QueueRepository } from '../repository/queue.repository';


@Injectable()
export class QueueService {
  constructor(private readonly queueRepository: QueueRepository) {}

  async issueToken(userId: string) {
    const token = await this.queueRepository.createToken(userId);
    return { token };
  }

  async getToken(userId: string) {
    const token = await this.queueRepository.getTokenByUserId(userId);
    if (!token) {
      throw new Error('No token found for user');
    }
    return token
  }
}
