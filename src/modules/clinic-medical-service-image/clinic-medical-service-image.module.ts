import { Module } from '@nestjs/common';
import { ClinicMedicalServiceImageService } from './clinic-medical-service-image.service';
import { ClinicMedicalServiceImageController } from './clinic-medical-service-image.controller';

@Module({
  controllers: [ClinicMedicalServiceImageController],
  providers: [ClinicMedicalServiceImageService]
})
export class ClinicMedicalServiceImageModule {}
