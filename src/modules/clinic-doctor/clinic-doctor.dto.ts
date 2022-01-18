import { ApiProperty } from '@nestjs/swagger'
import { ClinicDepartment } from '../clinic-department/clinic-department.enitiy'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'

export class ClinicDoctorDto {
	clinic?: Clinic

	doctor?: Doctor

	clinicDepartment?: ClinicDepartment
}
