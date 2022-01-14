import { Controller } from '@nestjs/common';
import { ClinicServiceService } from './clinic-service.service';

@Controller('clinic-service')
export class ClinicServiceController {
  constructor(private readonly clinicServiceService: ClinicServiceService) {}
}
