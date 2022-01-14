import { Controller } from '@nestjs/common';
import { ClinicDepartmentDoctorService } from './clinic-department-doctor.service';

@Controller('clinic-department-doctor')
export class ClinicDepartmentDoctorController {
  constructor(private readonly clinicDepartmentDoctorService: ClinicDepartmentDoctorService) {}
}
