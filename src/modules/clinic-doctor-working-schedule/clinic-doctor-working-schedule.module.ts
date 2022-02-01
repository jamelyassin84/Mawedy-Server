import { Module } from '@nestjs/common'
import { ClinicDoctorWorkingScheduleService } from './clinic-doctor-working-schedule.service'
import { ClinicDoctorWorkingScheduleController } from './clinic-doctor-working-schedule.controller'

@Module({
	controllers: [ClinicDoctorWorkingScheduleController],
	providers: [ClinicDoctorWorkingScheduleService],
	exports: [ClinicDoctorWorkingScheduleService],
})
export class ClinicDoctorWorkingScheduleModule {}
