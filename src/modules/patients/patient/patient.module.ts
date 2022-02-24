import { Module } from '@nestjs/common'
import { PatientService } from './patient.service'
import { PatientController } from './patient.controller'
import { EmailsModule } from 'src/modules/email/email.module'
import { PhonesModule } from 'src/modules/phone/phone.module'
import { ClinicPatientModule } from 'src/modules/clinic-patient/clinic-patient.module'

@Module({
	imports: [EmailsModule, PhonesModule, ClinicPatientModule],
	controllers: [PatientController],
	providers: [PatientService],
	exports: [PatientService],
})
export class PatientModule {}
