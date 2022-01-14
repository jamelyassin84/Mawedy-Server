import { Controller } from '@nestjs/common';
import { ClinicMedicalServiceService } from './clinic-medical-service.service';

@Controller('clinic-medical-service')
export class ClinicMedicalServiceController {
  constructor(private readonly clinicMedicalServiceService: ClinicMedicalServiceService) {}
}
