import { Controller } from '@nestjs/common';
import { ClinicMedicalServiceImageService } from './clinic-medical-service-image.service';

@Controller('clinic-medical-service-image')
export class ClinicMedicalServiceImageController {
  constructor(private readonly clinicMedicalServiceImageService: ClinicMedicalServiceImageService) {}
}
