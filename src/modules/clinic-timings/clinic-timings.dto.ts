import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicTimingDto {
	@IsNotEmpty()
	@ApiProperty()
	openedAt: string

	@IsNotEmpty()
	@ApiProperty()
	closedAt: string

	@IsNotEmpty()
	@ApiProperty()
	day: string

	@IsNotEmpty()
	@ApiProperty()
	isAlwaysOpen: boolean = true

	clinic?: Clinic
}
