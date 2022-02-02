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
	middle: string

	@ApiProperty()
	@IsNotEmpty()
	@IsDefined()
	last: string

	@ApiProperty()
	ext: string

	@IsNotEmpty()
	@ApiProperty()
	address: string

	@IsNotEmpty()
	@ApiProperty()
	sex: 'M' | 'F'

	@ApiProperty()
	religion: string

	@IsNotEmpty()
	@ApiProperty()
	dob: string

	@ApiProperty()
	city: string

	@ApiProperty()
	country: string

	@IsNotEmpty()
	@ApiProperty()
	phone: string

	@IsNotEmpty()
	@ApiProperty()
	email: string

	@ApiProperty()
	age: string
}
export type PatientType = 'walk-in' | 'app'
