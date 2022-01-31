import { EmailsModule } from './../email/email.module'
import { PhonesModule } from './../phone/phone.module'
import { Module } from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { DoctorController } from './doctor.controller'

@Module({
	imports: [PhonesModule, EmailsModule],
	controllers: [DoctorController],
	providers: [DoctorService],
})
export class DoctorModule {}
