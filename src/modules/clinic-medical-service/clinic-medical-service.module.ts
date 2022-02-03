import { Module } from '@nestjs/common'
import { ClinicMedicalServiceService } from './clinic-medical-service.service'
import { ClinicMedicalServiceController } from './clinic-medical-service.controller'
import { ClinicMedicalServicesDoctorsModule } from '../clinic-medical-services-doctor/clinic-medical-services-doctor.module'
import { ClinicDepartmentDoctorModule } from '../clinic-department-doctor/clinic-department-doctor.module'

@Module({
	imports: [ClinicMedicalServicesDoctorsModule, ClinicDepartmentDoctorModule],
	controllers: [ClinicMedicalServiceController],
	providers: [ClinicMedicalServiceService],
})
export class ClinicMedicalServiceModule {}
