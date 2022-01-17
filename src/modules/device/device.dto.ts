import { UserType } from './../../authentication/auth-login.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'
import { Clinic } from '../clinic/clinic.entity'
import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

export class DeviceDto {
	@ApiProperty()
	device: string | null

	@ApiProperty()
	ipAddress: string | null

	@ApiProperty()
	macAddress: string | null

	@ApiProperty()
	browserAddress: string | null

	@ApiProperty()
	email: string | null

	@ApiProperty()
	isActive: boolean | true

	@ApiProperty()
	isLoggedIn: boolean | true

	@ApiProperty()
	admin: Admin | null

	@ApiProperty()
	clinic: Clinic | null

	@ApiProperty()
	doctor: Doctor | null

	@ApiProperty()
	patient: Patient | null

	@ApiProperty()
	clinicAccount: ClinicAccount | null
}
