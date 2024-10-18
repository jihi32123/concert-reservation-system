import { QueueService } from "src/domain/queue/application/queue.service";

export class QueueUsecase {
    constructor(private readonly queueService: QueueService) {}
    async getQueueStatus(userId : string){
        await this.queueService.issueToken(userId)
        return this.queueService.getToken(userId)
    }
}