import { EmailsModule } from './../email/email.module'
import { PhonesModule } from './../phone/phone.module'
import { Module } from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { DoctorController } from './doctor.controller'
import { ClinicDoctorsModule } from '../clinic-doctor/clinic-doctor.module'
import { ClinicDoctorWorkingScheduleModule } from '../clinic-doctor-working-schedule/clinic-doctor-working-schedule.module'

@Module({
	imports: [
		EmailsModule,
		PhonesModule,
		ClinicDoctorsModule,
		ClinicDoctorWorkingScheduleModule,
	],
	controllers: [DoctorController],
	providers: [DoctorService],
})
export class DoctorModule {}
