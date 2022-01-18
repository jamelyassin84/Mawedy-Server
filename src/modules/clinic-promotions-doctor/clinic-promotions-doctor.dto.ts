import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicPromotionDoctorDto {
	@IsNotEmpty()
	@ApiProperty()
	isActive: boolean = true

	@IsNotEmpty()
	@ApiProperty()
	doctorId: number

	clinic?: Clinic
}
