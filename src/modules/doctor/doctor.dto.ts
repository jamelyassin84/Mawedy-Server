import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'
import { Clinic } from '../clinic/clinic.entity'
import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

export class DoctorDto {
	@IsNotEmpty()
	@ApiProperty()
	name: string

	@IsNotEmpty()
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
	isAvailable?: boolean = true
}
