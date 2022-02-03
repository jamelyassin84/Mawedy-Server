import { Module } from '@nestjs/common'
import { ClinicMedicalServicesDoctorsService } from './clinic-medical-services-doctor.service'
import { ClinicMedicalServicesDoctorsController } from './clinic-medical-services-doctor.controller'

@Module({
	controllers: [ClinicMedicalServicesDoctorsController],
	providers: [ClinicMedicalServicesDoctorsService],
	exports: [ClinicMedicalServicesDoctorsService],
})
export class ClinicMedicalServicesDoctorsModule {}
