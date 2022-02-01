import { Module } from '@nestjs/common'
import { ClinicDoctorsService } from './clinic-doctor.service'
import { ClinicDoctorsController } from './clinic-doctor.controller'

@Module({
	controllers: [ClinicDoctorsController],
	providers: [ClinicDoctorsService],
	exports: [ClinicDoctorsService],
})
export class ClinicDoctorsModule {}
