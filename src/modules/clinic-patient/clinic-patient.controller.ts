import { Controller } from '@nestjs/common';
import { ClinicPatientService } from './clinic-patient.service';

@Controller('clinic-patient')
export class ClinicPatientController {
  constructor(private readonly clinicPatientService: ClinicPatientService) {}
}
