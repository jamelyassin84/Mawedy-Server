import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class DoctorDto {
	@ApiProperty()
	avatar?: string | null = null

	@IsNotEmpty()
	@ApiProperty()
	name: string

	@ApiProperty()
	title: string

	@IsNotEmpty()
	@ApiProperty()
	profession: string

	@IsNotEmpty()
	@ApiProperty()
	specialties: string

	@IsNotEmpty()
	@ApiProperty()
	yearsOfExperience: number

	@IsNotEmpty()
	@ApiProperty()
	about: string

	@IsNotEmpty()
	@ApiProperty()
	phone: string

	@IsNotEmpty()
	@ApiProperty()
	email: string

	@IsNotEmpty()
	@ApiProperty()
	isAvailable?: boolean = true
}
