import { Controller } from '@nestjs/common';
import { PatientMedicalRecordService } from './patient-medical-record.service';

@Controller('patient-medical-record')
export class PatientMedicalRecordController {
  constructor(private readonly patientMedicalRecordService: PatientMedicalRecordService) {}
}
