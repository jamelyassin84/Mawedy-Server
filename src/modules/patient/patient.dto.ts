import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { BaseEntity } from 'typeorm'

export class PatientDto extends BaseEntity {
	@IsNotEmpty()
	@ApiProperty()
	type: PatientType

	@ApiProperty()
	@IsNotEmpty()
	first: string

	@ApiProperty()
	@IsNotEmpty()
	middle: string

	@ApiProperty()
	@IsNotEmpty()
	last: string

	@ApiProperty()
	@IsNotEmpty()
	ext: string

	@ApiProperty()
	@IsNotEmpty()
	address: string

	@ApiProperty()
	@IsNotEmpty()
	sex: 'M' | 'F'

	@ApiProperty()
	religion: string
}

export type PatientType = 'walk-in' | 'app'
