import { ClinicAccount } from './../clinic-account/clinic-account.entity'
import { Clinic } from './../clinic/clinic.entity'
import { UserType } from './../../authentication/auth-login.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

export class PhoneDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	userType: UserType

	@ApiProperty()
	phone: string

	@ApiProperty()
	areaCode: number = 971

	@ApiProperty()
	isActive: boolean = true

	admin?: Admin | null
	clinic?: Clinic
	clinicAccount?: ClinicAccount
	doctor?: Doctor
	patient?: Patient
}
