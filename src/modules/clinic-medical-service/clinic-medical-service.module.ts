import { Module } from '@nestjs/common';
import { ClinicMedicalServiceService } from './clinic-medical-service.service';
import { ClinicMedicalServiceController } from './clinic-medical-service.controller';

@Module({
  controllers: [ClinicMedicalServiceController],
  providers: [ClinicMedicalServiceService]
})
export class ClinicMedicalServiceModule {}
