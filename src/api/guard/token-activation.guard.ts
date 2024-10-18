import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { QueueService } from 'src/domain/queue/application/queue.service';


@Injectable()
export class TokenActivationGuard implements CanActivate {
  constructor(private readonly queueService: QueueService) {}

  // 토큰이 활성화 상태인지 확인하는 가드
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId; // userId를 요청 파라미터에서 가져옴

    // QueueService를 통해 토큰 상태 조회
    const token = await this.queueService.getToken(userId);

    // 토큰이 없거나 만료된 경우
    if (!token) {
      throw new ForbiddenException('Token not found for the user');
    }

    // 토큰이 활성화(VALID)되지 않았으면 예외 발생
    if (token.status !== 'VALID') {
      throw new ForbiddenException('Your token is not yet active, please wait.');
    }

    return true; // 토큰이 활성화 상태일 때만 true 반환
  }
}
