import { UserType } from './../../authentication/auth-login.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'
import { Clinic } from '../clinic/clinic.entity'
import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { Patient } from '../patient/patient.entity'

export class LogDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	role: UserType | null = null

	@ApiProperty()
	isActive: boolean = true

	admin?: Admin
	clinic?: Clinic
	clinicAccount?: ClinicAccount
	patient?: Patient
}
