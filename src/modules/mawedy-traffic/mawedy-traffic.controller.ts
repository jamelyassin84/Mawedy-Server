import { Controller } from '@nestjs/common';
import { MawedyTrafficService } from './mawedy-traffic.service';

@Controller('mawedy-traffic')
export class MawedyTrafficController {
  constructor(private readonly mawedyTrafficService: MawedyTrafficService) {}
}
