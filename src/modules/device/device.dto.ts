import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'
import { Clinic } from '../clinic/clinic.entity'
import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patients/patient/patient.entity'

export class DeviceDto {
	@IsNotEmpty()
	@ApiProperty()
	device: string | null = null

	@IsNotEmpty()
	@ApiProperty()
	ipAddress: string | null = null

	@IsNotEmpty()
	@ApiProperty()
	macAddress: string | null = null

	@IsNotEmpty()
	@ApiProperty()
	browserAddress: string | null = null

	@IsNotEmpty()
	@ApiProperty()
	isActive: boolean = true

	@IsNotEmpty()
	@ApiProperty()
	isLoggedIn: boolean = true

	admin?: Admin | null = null

	clinic?: Clinic | null = null

	doctor?: Doctor | null = null

	patient?: Patient | null = null

	clinicAccount?: ClinicAccount | null = null
}
