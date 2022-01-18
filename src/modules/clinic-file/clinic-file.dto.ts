import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'

export class ClinicFileDto {
	@IsNotEmpty()
	@ApiProperty()
	name: string

	@IsNotEmpty()
	@ApiProperty()
	url: string

	clinic?: Clinic
}
