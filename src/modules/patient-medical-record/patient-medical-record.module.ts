import { Module } from '@nestjs/common';
import { PatientMedicalRecordService } from './patient-medical-record.service';
import { PatientMedicalRecordController } from './patient-medical-record.controller';

@Module({
  controllers: [PatientMedicalRecordController],
  providers: [PatientMedicalRecordService]
})
export class PatientMedicalRecordModule {}
