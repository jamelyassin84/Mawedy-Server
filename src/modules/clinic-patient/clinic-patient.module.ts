import { Module } from '@nestjs/common'
import { ClinicPatientService } from './clinic-patient.service'
import { ClinicPatientController } from './clinic-patient.controller'

@Module({
	controllers: [ClinicPatientController],
	providers: [ClinicPatientService],
	exports: [ClinicPatientService],
})
export class ClinicPatientModule {}
