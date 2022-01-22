import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'

export class ClinicDepartmentDoctorDto {
	@ApiProperty()
	isActive?: boolean = true

	clinic?: Clinic

	@IsNotEmpty()
	@ApiProperty()
	doctorId?: number
}
