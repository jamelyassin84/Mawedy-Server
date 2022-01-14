import { Controller } from '@nestjs/common';
import { MawedySessionService } from './mawedy-session.service';

@Controller('mawedy-session')
export class MawedySessionController {
  constructor(private readonly mawedySessionService: MawedySessionService) {}
}
