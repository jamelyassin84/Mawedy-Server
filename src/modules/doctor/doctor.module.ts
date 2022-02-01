import { EmailsModule } from './../email/email.module'
import { PhonesModule } from './../phone/phone.module'
import { Module } from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { DoctorController } from './doctor.controller'
import { ClinicDoctorsModule } from '../clinic-doctor/clinic-doctor.module'

@Module({
	imports: [PhonesModule, EmailsModule, ClinicDoctorsModule, PhonesModule],
	controllers: [DoctorController],
	providers: [DoctorService],
})
export class DoctorModule {}
