import { Controller } from '@nestjs/common';
import { ClinicDoctorWorkingScheduleService } from './clinic-doctor-working-schedule.service';

@Controller('clinic-doctor-working-schedule')
export class ClinicDoctorWorkingScheduleController {
  constructor(private readonly clinicDoctorWorkingScheduleService: ClinicDoctorWorkingScheduleService) {}
}
