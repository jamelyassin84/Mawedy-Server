import { Controller } from '@nestjs/common';
import { ClinicFollowUpCheckUpService } from './clinic-follow-up-check-up.service';

@Controller('clinic-follow-up-check-up')
export class ClinicFollowUpCheckUpController {
  constructor(private readonly clinicFollowUpCheckUpService: ClinicFollowUpCheckUpService) {}
}
