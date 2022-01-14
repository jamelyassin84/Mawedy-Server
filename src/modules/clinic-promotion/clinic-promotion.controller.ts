import { Controller } from '@nestjs/common';
import { ClinicPromotionService } from './clinic-promotion.service';

@Controller('clinic-promotion')
export class ClinicPromotionController {
  constructor(private readonly clinicPromotionService: ClinicPromotionService) {}
}
