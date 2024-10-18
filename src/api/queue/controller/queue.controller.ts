import { Controller, Get, Param } from '@nestjs/common';
import { QueueUsecase } from '../usecase/queue.usecase';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueUsecase: QueueUsecase) {}

  @Get('token/:userId')
  async getQueueStatus(@Param('userId') userId: string) {
    return await this.queueUsecase.getQueueStatus(userId);
  }
}