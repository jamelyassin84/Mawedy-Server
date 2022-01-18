import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
import { BaseEntity } from 'typeorm'

export class PatientDto extends BaseEntity {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	type: PatientType = 'app'

	@ApiProperty()
	@IsNotEmpty()
	@IsDefined()
	first: string

	@ApiProperty()
	@IsNotEmpty()
	@IsDefined()
	middle: string

	@ApiProperty()
	@IsNotEmpty()
	@IsDefined()
	last: string

	@ApiProperty()
	ext: string

	@ApiProperty()
	address: string

	@ApiProperty()
	sex: 'M' | 'F'

	@ApiProperty()
	religion: string
}

export type PatientType = 'walk-in' | 'app'
