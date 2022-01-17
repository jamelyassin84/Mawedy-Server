import { ClinicAccount } from './../clinic-account/clinic-account.entity'
import { Clinic } from './../clinic/clinic.entity'
import { UserType } from './../../authentication/auth-login.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

export class PhoneDto {
	@IsNotEmpty()
	@ApiProperty()
	userType: UserType

	@IsNotEmpty()
	@ApiProperty()
	phone: string

	@ApiProperty()
	areaCode: string | 971

	@ApiProperty()
	isActive: boolean | true

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
