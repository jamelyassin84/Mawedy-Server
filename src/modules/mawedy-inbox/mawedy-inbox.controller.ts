import { Controller } from '@nestjs/common';
import { MawedyInboxService } from './mawedy-inbox.service';

@Controller('mawedy-inbox')
export class MawedyInboxController {
  constructor(private readonly mawedyInboxService: MawedyInboxService) {}
}
