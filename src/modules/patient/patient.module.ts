import { ClinicPatientModule } from './../clinic-patient/clinic-patient.module'
import { PhonesModule } from './../phone/phone.module'
import { EmailsModule } from './../email/email.module'
import { Module } from '@nestjs/common'
import { PatientService } from './patient.service'
import { PatientController } from './patient.controller'

@Module({
	imports: [EmailsModule, PhonesModule, ClinicPatientModule],
	controllers: [PatientController],
	providers: [PatientService],
	exports: [PatientService],
})
export class PatientModule {}
