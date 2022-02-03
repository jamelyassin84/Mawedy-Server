import { ClinicDepartment } from './../clinic-department/clinic-department.enitiy'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicMedicalServiceDto {
	@IsNotEmpty()
	@ApiProperty()
	name: string

	@IsNotEmpty()
	@ApiProperty()
	isActive: boolean = true

	@IsNotEmpty()
	@ApiProperty()
	description: string

	@IsNotEmpty()
	@ApiProperty()
	department: ClinicDepartment

	doctors?: any
}
