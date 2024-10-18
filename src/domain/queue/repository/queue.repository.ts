import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class QueueRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createToken(userId: string) {
    return this.prisma.token.create({
      data: {
        userId,
      },
    });
  }
  async getTokenByUserId(userId: string) {
    const token = await this.prisma.token.findUnique({
      where: {
        userId: userId,
      },
    });
    const waitingOrder = this.countWaitingAhead(token.createdAt)
    return {
      ...token, waitingOrder
    }
  }
  public async countWaitingAhead(createdAt: Date): Promise<number> {
    return this.prisma.token.count({
      where: {
        status: 'WAITING',
        createdAt: {
          lt: createdAt, 
        },
      },
    });
  }
}
