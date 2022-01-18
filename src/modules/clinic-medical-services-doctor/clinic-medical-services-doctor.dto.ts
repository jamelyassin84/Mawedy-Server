import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicMedicalServiceImageDto {
	@IsNotEmpty()
	@ApiProperty()
	url: string

	@IsNotEmpty()
	@ApiProperty()
	isActive: boolean = true

	@IsNotEmpty()
	@ApiProperty()
	doctorId: number

	@IsNotEmpty()
	@ApiProperty()
	clinicServiceId: number

	@IsNotEmpty()
	@ApiProperty()
	clinicMedicalServiceId: number

	@IsNotEmpty()
	@ApiProperty()
	clinicDepartmentId: number

	clinic?: Clinic
}
