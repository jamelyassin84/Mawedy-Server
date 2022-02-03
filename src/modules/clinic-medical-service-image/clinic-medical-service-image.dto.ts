import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicMedicalServiceImageDto {
	@IsNotEmpty()
	@ApiProperty()
	clinicMedicalServiceId: number

	@ApiProperty()
	photos?: FormData[]
}
