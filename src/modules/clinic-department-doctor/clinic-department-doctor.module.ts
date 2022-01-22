import { Module } from '@nestjs/common';
import { ClinicDepartmentDoctorService } from './clinic-department-doctor.service';
import { ClinicDepartmentDoctorController } from './clinic-department-doctor.controller';

@Module({
  controllers: [ClinicDepartmentDoctorController],
  providers: [ClinicDepartmentDoctorService]
})
export class ClinicDepartmentDoctorModule {}
