import { Module } from '@nestjs/common';
import { PatientFavoritedClinicService } from './patient-favorited-clinic.service';
import { PatientFavoritedClinicController } from './patient-favorited-clinic.controller';

@Module({
  controllers: [PatientFavoritedClinicController],
  providers: [PatientFavoritedClinicService]
})
export class PatientFavoritedClinicModule {}
