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
	clinicServiceId: number

	@IsNotEmpty()
	@ApiProperty()
	description: string

	@IsNotEmpty()
	@ApiProperty()
	doctorId: number

	@IsNotEmpty()
	@ApiProperty()
	clinicDepartmentId: number

	clinic?: Clinic
}
