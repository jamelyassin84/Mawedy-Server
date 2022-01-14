import { Controller } from '@nestjs/common';
import { PatientFavoritedClinicService } from './patient-favorited-clinic.service';

@Controller('patient-favorited-clinic')
export class PatientFavoritedClinicController {
  constructor(private readonly patientFavoritedClinicService: PatientFavoritedClinicService) {}
}
