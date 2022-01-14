import { Controller } from '@nestjs/common';
import { ClinicTimingsService } from './clinic-timings.service';

@Controller('clinic-timings')
export class ClinicTimingsController {
  constructor(private readonly clinicTimingsService: ClinicTimingsService) {}
}
