import { UserType } from './../../authentication/auth-login.dto'
import { ApiProperty } from '@nestjs/swagger'
import { isBoolean, IsDefined, IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'
import { Clinic } from '../clinic/clinic.entity'
import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

export class EmailDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	role: UserType | null = null

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	userType: UserType | null = null

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	email: string

	@ApiProperty()
	isActive: boolean = true

	@ApiProperty()
	admin: Admin | null

	@ApiProperty()
	clinic: Clinic | null

	@ApiProperty()
	clinicAccount: ClinicAccount | null

	@ApiProperty()
	doctor: Doctor | null

	@ApiProperty()
	patient: Patient | null
}
